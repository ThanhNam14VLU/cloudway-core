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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SepayController = void 0;
const common_1 = require("@nestjs/common");
const sepay_service_1 = require("./sepay.service");
let SepayController = class SepayController {
    sepayService;
    webhookKey = process.env.SEPAY_WEBHOOK_KEY;
    constructor(sepayService) {
        this.sepayService = sepayService;
    }
    async handleWebhook(headers, req, body, res) {
        console.log('🚀 ===== WEBHOOK SEPAY RECEIVED =====');
        console.log('🔍 Timestamp:', new Date().toISOString());
        console.log('🔍 Body:', JSON.stringify(body, null, 2));
        console.log('🔍 All headers received:', JSON.stringify(headers, null, 2));
        console.log('🔍 Request headers:', JSON.stringify(req.headers, null, 2));
        console.log('🔍 Expected API Key:', this.webhookKey);
        console.log('🔍 All header keys:', Object.keys(headers));
        console.log('🔍 All request header keys:', Object.keys(req.headers));
        let authorization;
        authorization = headers['authorization'] ||
            headers['Authorization'] ||
            headers['AUTHORIZATION'];
        if (!authorization && req.headers) {
            authorization = req.headers['authorization'] ||
                req.headers['Authorization'] ||
                req.headers['AUTHORIZATION'];
        }
        if (!authorization) {
            const ngrokHeaders = Object.keys(req.headers).filter(key => key.toLowerCase().includes('authorization'));
            if (ngrokHeaders.length > 0) {
                console.log('🔍 Found ngrok authorization headers:', ngrokHeaders);
                authorization = req.headers[ngrokHeaders[0]];
            }
        }
        console.log('🔍 Authorization header found:', authorization ? `"${authorization}"` : 'NOT FOUND');
        if (authorization) {
            const trimmedAuth = authorization.trim();
            const authParts = trimmedAuth.split(/\s+/);
            console.log('🔍 Auth parts after split:', authParts);
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
        }
        else {
            console.warn('⚠️ Webhook Sepay: Thiếu header Authorization!');
            console.warn('⚠️ TEMPORARY: Cho phép request đi qua để test...');
        }
        await this.sepayService.handlePaymentUpdate(body);
        return res.status(200).send('OK');
    }
};
exports.SepayController = SepayController;
__decorate([
    (0, common_1.Post)('webhook'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], SepayController.prototype, "handleWebhook", null);
exports.SepayController = SepayController = __decorate([
    (0, common_1.Controller)('payment/sepay'),
    __metadata("design:paramtypes", [sepay_service_1.SepayService])
], SepayController);
//# sourceMappingURL=sepay.controller.js.map