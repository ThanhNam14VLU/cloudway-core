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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const supabase_service_1 = require("../../services/supabase/supabase.service");
const common_2 = require("@nestjs/common");
const account_locked_exception_1 = require("../../common/exceptions/account-locked.exception");
const DEFAULT_AVATAR_URL = 'https://api.dicebear.com/7.x/avataaars/svg?seed=';
let AuthService = class AuthService {
    userService;
    supabaseService;
    constructor(userService, supabaseService) {
        this.userService = userService;
        this.supabaseService = supabaseService;
    }
    async supabaseLogin(token) {
        const { data, error } = await this.supabaseService.client.auth.getUser(token);
        if (error || !data?.user)
            throw new common_2.UnauthorizedException('Token không hợp lệ');
        const supaUser = data.user;
        const metadata = supaUser.user_metadata || {};
        const { data: userRecord, error: userError } = await this.supabaseService.client
            .from('users')
            .select('id, account_status')
            .eq('id', supaUser.id)
            .single();
        if (userError) {
            throw new common_2.UnauthorizedException('Không tìm thấy thông tin người dùng');
        }
        if (userRecord.account_status === 'LOCKED') {
            throw new account_locked_exception_1.AccountLockedException();
        }
        const fullName = metadata.first_name && metadata.last_name
            ? `${metadata.first_name} ${metadata.last_name}`
            : metadata.full_name || metadata.name || supaUser.email.split('@')[0];
        const avatarUrl = metadata.avatar_url || `${DEFAULT_AVATAR_URL}${supaUser.id}`;
        const user = await this.userService.upsertUser({
            id: supaUser.id,
            email: supaUser.email,
            full_name: fullName,
            avatar_url: avatarUrl,
            phone: metadata.phone || null,
        });
        return { message: '✅ Đăng nhập thành công', user };
    }
    async supabaseRegister(token) {
        const { data, error } = await this.supabaseService.client.auth.getUser(token);
        if (error || !data?.user)
            throw new common_2.UnauthorizedException('Token không hợp lệ');
        const supaUser = data.user;
        const metadata = supaUser.user_metadata || {};
        const fullName = metadata.first_name && metadata.last_name
            ? `${metadata.first_name} ${metadata.last_name}`
            : metadata.full_name || metadata.name || supaUser.email.split('@')[0];
        const avatarUrl = metadata.avatar_url || `${DEFAULT_AVATAR_URL}${supaUser.id}`;
        const user = await this.userService.upsertUser({
            id: supaUser.id,
            email: supaUser.email,
            full_name: fullName,
            avatar_url: avatarUrl,
            phone: metadata.phone || null,
            role: 'CUSTOMER',
        });
        return {
            message: '✅ Đăng ký thành công',
            user,
            supabase_user: {
                id: supaUser.id,
                email: supaUser.email,
                phone: metadata.phone,
            }
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        supabase_service_1.SupabaseService])
], AuthService);
//# sourceMappingURL=auth.service.js.map