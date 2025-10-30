import { Controller, Post, HttpCode, Res, Headers, Body, Req } from '@nestjs/common';
import { SepayService } from './sepay.service';
import type { Response, Request } from 'express';

@Controller('payment/sepay')
export class SepayController {
  private readonly webhookKey = process.env.SEPAY_WEBHOOK_KEY;

  constructor(private readonly sepayService: SepayService) {}

  @Post('webhook')
  @HttpCode(200)
  async handleWebhook(
    @Headers() headers: Record<string, string>,
    @Req() req: Request,
    @Body() body: any,
    @Res() res: Response
  ) {
    // Debug: Log ngay đầu để đảm bảo request đến được endpoint
    console.log('🚀 ===== WEBHOOK SEPAY RECEIVED =====');
    console.log('🔍 Timestamp:', new Date().toISOString());
    console.log('🔍 Body:', JSON.stringify(body, null, 2));
    console.log('🔍 All headers received:', JSON.stringify(headers, null, 2));
    console.log('🔍 Request headers:', JSON.stringify(req.headers, null, 2));
    console.log('🔍 Expected API Key:', this.webhookKey);
    console.log('🔍 All header keys:', Object.keys(headers));
    console.log('🔍 All request header keys:', Object.keys(req.headers));

    // Sepay gửi API key qua header Authorization với format: "Apikey API_KEY"
    // Tìm header Authorization (case-insensitive) từ nhiều nguồn
    let authorization: string | undefined;
    
    // Thử tìm trong headers object
    authorization = headers['authorization'] || 
                    headers['Authorization'] ||
                    headers['AUTHORIZATION'];
    
    // Thử tìm trong raw request headers (Express)
    if (!authorization && req.headers) {
      authorization = req.headers['authorization'] as string || 
                      req.headers['Authorization'] as string ||
                      req.headers['AUTHORIZATION'] as string;
    }

    // Thử tìm với ngrok headers (ngrok có thể thêm prefix)
    if (!authorization) {
      const ngrokHeaders = Object.keys(req.headers).filter(key => 
        key.toLowerCase().includes('authorization')
      );
      if (ngrokHeaders.length > 0) {
        console.log('🔍 Found ngrok authorization headers:', ngrokHeaders);
        authorization = req.headers[ngrokHeaders[0]] as string;
      }
    }

    console.log('🔍 Authorization header found:', authorization ? `"${authorization}"` : 'NOT FOUND');

    // TEMPORARY: Cho phép không có Authorization để test
    // TODO: Remove sau khi confirm Sepay gửi Authorization như thế nào
    // Nếu có authorization header thì validate
    if (authorization) {
      // Trim và parse API key từ format "Apikey API_KEY" (case-insensitive)
      const trimmedAuth = authorization.trim();
      const authParts = trimmedAuth.split(/\s+/); // Split by any whitespace

      console.log('🔍 Auth parts after split:', authParts);
      // Kiểm tra format: phải có 2 parts và phần đầu phải là "Apikey" (case-insensitive)
      if (authParts.length !== 2 || authParts[0].toLowerCase() !== 'apikey') {
        console.warn('❌ Webhook Sepay: Format Authorization không hợp lệ!');
        console.warn(`Received: "${authorization}"`);
        console.warn(`Auth parts:`, authParts);
        console.warn(`First part (lowercase): "${authParts[0]?.toLowerCase()}"`);
        return res.status(401).send('Unauthorized');
      }

      const apiKey = authParts[1].trim();
      console.log('🔍 Extracted API Key:', apiKey);
      console.log('🔍 Expected API Key:', this.webhookKey);
      console.log('🔍 API Keys match:', apiKey === this.webhookKey);

      if (apiKey !== this.webhookKey) {
        console.warn('❌ Webhook Sepay: API Key không hợp lệ!');
        console.warn(`Expected: "${this.webhookKey}"`);
        console.warn(`Received: "${apiKey}"`);
        return res.status(401).send('Unauthorized');
      }
    } else {
      console.warn('⚠️ Webhook Sepay: Thiếu header Authorization!');
      console.warn('⚠️ TEMPORARY: Cho phép request đi qua để test...');
      // TODO: Uncomment dòng dưới sau khi setup đúng Authorization
      // return res.status(401).send('Unauthorized');
    }

    // Gọi service để xử lý thanh toán (ví dụ: cập nhật trạng thái đơn hàng)
    await this.sepayService.handlePaymentUpdate(body);

    return res.status(200).send('OK');
  }
}
