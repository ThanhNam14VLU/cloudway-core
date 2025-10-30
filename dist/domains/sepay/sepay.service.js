"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SepayService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SepayService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../../services/supabase/supabase.service");
let SepayService = SepayService_1 = class SepayService {
    supabaseService;
    logger = new common_1.Logger(SepayService_1.name);
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async handlePaymentUpdate(data) {
        try {
            this.logger.log(`🔔 Nhận webhook từ Sepay: ${JSON.stringify(data)}`);
            const { id, content, transferType, transferAmount, referenceCode, transactionDate, } = data;
            if (transferType !== 'in') {
                this.logger.warn(`⚠️ Bỏ qua giao dịch type: ${transferType} (chỉ xử lý "in")`);
                return;
            }
            let bookingCode = null;
            if (content) {
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
            if (Math.abs(payment.amount - transferAmount) > 1000) {
                this.logger.warn(`⚠️ Số tiền không khớp: Payment=${payment.amount}, Transfer=${transferAmount}`);
            }
            if (payment.status !== 'PENDING') {
                this.logger.log(`ℹ️ Payment đã được xử lý trước đó. Status hiện tại: ${payment.status}`);
                return;
            }
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
            await this.supabaseService.client
                .from('bookings')
                .update({ status: 'CONFIRMED', updated_at: new Date().toISOString() })
                .eq('id', booking.id);
            this.logger.log(`✅ Đã cập nhật thanh toán [${bookingCode}] → PAID (Payment ID: ${payment.id})`);
        }
        catch (err) {
            this.logger.error('🔥 Lỗi xử lý webhook Sepay:', err);
        }
    }
};
exports.SepayService = SepayService;
exports.SepayService = SepayService = SepayService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], SepayService);
//# sourceMappingURL=sepay.service.js.map