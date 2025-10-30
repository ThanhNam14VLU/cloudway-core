import { Injectable, Logger } from '@nestjs/common';
import { SupabaseService } from '../../services/supabase/supabase.service';

@Injectable()
export class SepayService {
  private readonly logger = new Logger(SepayService.name);
  constructor(private readonly supabaseService: SupabaseService) {}

  async handlePaymentUpdate(data: any) {
    try {
      this.logger.log(`🔔 Nhận webhook từ Sepay: ${JSON.stringify(data)}`);

      // 1️⃣ Xác định các trường quan trọng trong webhook
      const {
        id,
        content,
        transferType,
        transferAmount,
        referenceCode,
        transactionDate,
      } = data;

      // 2️⃣ Chỉ xử lý khi transferType = "in" (tiền vào = thanh toán thành công)
      if (transferType !== 'in') {
        this.logger.warn(`⚠️ Bỏ qua giao dịch type: ${transferType} (chỉ xử lý "in")`);
        return;
      }

      // 3️⃣ Extract PNR code từ content
      // Format: "Thanh toan booking PNR[pnr_code]" → extract "[pnr_code]"
      // Ví dụ: "Thanh toan booking PNR2T38YZ" → code: "2T38YZ"
      let bookingCode: string | null = null;
      
      if (content) {
        // Tìm pattern: PNR + code (3-20 ký tự chữ và số)
        const match = content.match(/\bPNR([A-Z0-9]{3,20})\b/i);
        if (match && match[1]) {
          bookingCode = match[1].trim().toUpperCase();
          this.logger.log(`✅ Tìm thấy PNR code: ${bookingCode}`);
        }
      }

      if (!bookingCode) {
        this.logger.warn(`⚠️ Không tìm thấy PNR code trong content: "${content}"`);
        this.logger.warn(`⚠️ Format mong đợi: "Thanh toan booking PNR[pnr_code]"`);
        return;
      }

      // 4️⃣ Tìm booking theo PNR code
      const { data: booking, error: bookingError } = await this.supabaseService.client
        .from('bookings')
        .select('id, pnr_code, status')
        .eq('pnr_code', bookingCode)
        .maybeSingle();

      if (bookingError) {
        this.logger.error(`❌ Lỗi khi tìm booking: ${bookingError.message}`);
        return;
      }

      if (!booking) {
        this.logger.warn(`⚠️ Không tìm thấy booking với PNR code: ${bookingCode}`);
        return;
      }

      this.logger.log(`✅ Tìm thấy booking: ${booking.id} (PNR: ${booking.pnr_code})`);

      // 5️⃣ Tìm payment của booking này
      const { data: payment, error: paymentError } = await this.supabaseService.client
        .from('payments')
        .select('id, booking_id, amount, status')
        .eq('booking_id', booking.id)
        .order('created_at', { ascending: false })
        .maybeSingle();

      if (paymentError) {
        this.logger.error(`❌ Lỗi khi tìm payment: ${paymentError.message}`);
        return;
      }

      if (!payment) {
        this.logger.warn(`⚠️ Không tìm thấy payment cho booking: ${booking.id}`);
        return;
      }

      // 6️⃣ Kiểm tra số tiền có khớp không (optional, có thể bỏ qua)
      if (Math.abs(payment.amount - transferAmount) > 1000) {
        this.logger.warn(
          `⚠️ Số tiền không khớp: Payment=${payment.amount}, Transfer=${transferAmount}`
        );
        // Vẫn tiếp tục xử lý, chỉ cảnh báo
      }

      // 7️⃣ Chỉ update nếu payment đang ở trạng thái PENDING
      if (payment.status !== 'PENDING') {
        this.logger.log(
          `ℹ️ Payment đã được xử lý trước đó. Status hiện tại: ${payment.status}`
        );
        return;
      }

      // 8️⃣ Cập nhật payment status thành PAID
      const { error: updateError } = await this.supabaseService.client
        .from('payments')
        .update({
          status: 'PAID',
          transaction_id: referenceCode || id?.toString(),
          paid_at: transactionDate ? new Date(transactionDate).toISOString() : new Date().toISOString(),
        })
        .eq('id', payment.id);

      if (updateError) {
        this.logger.error(`❌ Lỗi khi cập nhật payment: ${updateError.message}`);
        return;
      }

      // 9️⃣ Cập nhật booking status thành CONFIRMED
      await this.supabaseService.client
        .from('bookings')
        .update({ status: 'CONFIRMED', updated_at: new Date().toISOString() })
        .eq('id', booking.id);

      this.logger.log(
        `✅ Đã cập nhật thanh toán [${bookingCode}] → PAID (Payment ID: ${payment.id})`
      );
    } catch (err) {
      this.logger.error('🔥 Lỗi xử lý webhook Sepay:', err);
    }
  }
}
