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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const supabase_service_1 = require("../../services/supabase/supabase.service");
let AuthMiddleware = class AuthMiddleware {
    supabaseService;
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async use(req, res, next) {
        if (req.path === '/payment/sepay/webhook') {
            console.log('🔓 Skipping auth middleware for Sepay webhook:', req.path);
            return next();
        }
        const token = this.extractTokenFromHeader(req);
        if (!token) {
            return res.status(common_1.HttpStatus.UNAUTHORIZED).json({
                message: 'Unauthorized',
            });
        }
        try {
            const decoded = jsonwebtoken_1.default.decode(token);
            if (!decoded || !decoded.sub) {
                return res.status(common_1.HttpStatus.UNAUTHORIZED).json({ message: 'Invalid token' });
            }
            const userId = decoded.sub;
            const { data: user } = await this.supabaseService.client
                .from('users')
                .select('id, email, full_name, role, avatar_url, phone')
                .eq('id', userId)
                .maybeSingle();
            req.user = user || { id: userId, role: 'CUSTOMER' };
        }
        catch (e) {
            return res.status(common_1.HttpStatus.UNAUTHORIZED).json({ message: 'Invalid token' });
        }
        next();
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], AuthMiddleware);
//# sourceMappingURL=auth.middleware.js.map