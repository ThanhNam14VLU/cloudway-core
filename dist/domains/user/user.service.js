"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../../services/supabase/supabase.service");
const bcrypt = __importStar(require("bcrypt"));
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const account_locked_exception_1 = require("../../common/exceptions/account-locked.exception");
let UserService = class UserService {
    supabaseService;
    userRepo;
    constructor(supabaseService, userRepo) {
        this.supabaseService = supabaseService;
        this.userRepo = userRepo;
    }
    async findAll() {
        const { data, error } = await this.supabaseService.client
            .from('users')
            .select('*');
        if (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return data;
    }
    async getProfile(id) {
        const { data: user, error } = await this.supabaseService.client
            .from('users')
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        if (user.accountStatus === 'LOCKED') {
            throw new account_locked_exception_1.AccountLockedException();
        }
        if (!user || user.role !== 'AIRLINE') {
            return user;
        }
        const { data: airlineLinks, error: auError } = await this.supabaseService.client
            .from('airline_users')
            .select(`
        airline:airline_id (
          id,
          iata_code,
          name,
          logo
        )
      `)
            .eq('user_id', id);
        if (auError) {
            throw new common_1.HttpException(auError.message, common_1.HttpStatus.BAD_REQUEST);
        }
        const airlines = (airlineLinks || [])
            .map((x) => x.airline)
            .filter(Boolean);
        return {
            ...user,
            airlines,
        };
    }
    async upsertUser(data) {
        const { id, email, full_name, avatar_url, role, phone } = data;
        let user = await this.userRepo.findOne({ where: { id } });
        if (user) {
            user.fullName = full_name;
            if (avatar_url !== undefined)
                user.avatarUrl = avatar_url;
            user.phone = phone ?? user.phone;
            user.role = role ?? user.role;
            return await this.userRepo.save(user);
        }
        user = this.userRepo.create({
            id,
            email,
            fullName: full_name,
            avatarUrl: avatar_url,
            phone,
            role: role ?? 'CUSTOMER',
            passwordHash: null,
        });
        return await this.userRepo.save(user);
    }
    async remove(id) {
        const { data, error } = await this.supabaseService.client
            .from('users')
            .delete()
            .eq('id', id)
            .select()
            .single();
        if (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return data;
    }
    async login(udto) {
        const { data: user, error } = await this.supabaseService.client
            .from('users')
            .select('*')
            .eq('email', udto.email)
            .single();
        if (error)
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        const valid = await bcrypt.compare(udto.password_hash, user.password_hash);
        if (!valid)
            throw new common_1.HttpException('sai thông tin đăng nhập', common_1.HttpStatus.UNAUTHORIZED);
        return { message: 'đăng nhập thành công' };
    }
    async updateProfile(id, updateData) {
        const { full_name, phone, email } = updateData;
        const { data, error } = await this.supabaseService.client
            .from('users')
            .update({
            full_name,
            phone,
            email,
            updated_at: new Date().toISOString(),
        })
            .eq('id', id)
            .select()
            .single();
        if (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return { message: 'Cập nhật hồ sơ thành công', user: data };
    }
    async updateAvatar(id, file) {
        if (!file) {
            throw new common_1.HttpException('File is required', common_1.HttpStatus.BAD_REQUEST);
        }
        const fileExt = (file.originalname.split('.').pop() || 'png').toLowerCase();
        const folder = `${id}`;
        const path = `${folder}/${id}.${fileExt}`;
        try {
            const { data: existingFiles, error: listError } = await this.supabaseService.client
                .storage
                .from('avatars')
                .list(folder);
            if (!listError && Array.isArray(existingFiles) && existingFiles.length > 0) {
                const pathsToRemove = existingFiles.map((f) => `${folder}/${f.name}`);
                await this.supabaseService.client.storage.from('avatars').remove(pathsToRemove);
            }
        }
        catch (_) {
        }
        const { data: uploadResult, error: uploadError } = await this.supabaseService.client
            .storage
            .from('avatars')
            .upload(path, file.buffer, {
            upsert: true,
            contentType: file.mimetype || 'image/png',
        });
        if (uploadError) {
            throw new common_1.HttpException(uploadError.message, common_1.HttpStatus.BAD_REQUEST);
        }
        const { data: { publicUrl } } = this.supabaseService.client
            .storage
            .from('avatars')
            .getPublicUrl(path);
        const { data, error } = await this.supabaseService.client
            .from('users')
            .update({
            avatar_url: publicUrl,
            updated_at: new Date().toISOString(),
        })
            .eq('id', id)
            .select()
            .single();
        if (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return { message: 'Cập nhật ảnh đại diện thành công', avatar_url: publicUrl, user: data };
    }
    async updateRole(id, newRole) {
        const { data, error } = await this.supabaseService.client
            .from('users')
            .update({
            role: newRole,
            updated_at: new Date().toISOString(),
        })
            .eq('id', id)
            .select()
            .single();
        if (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return { message: `Đã cập nhật vai trò người dùng thành ${newRole}`, user: data };
    }
    async getUserByRole(role) {
        const { data, error } = await this.supabaseService.client
            .from('users')
            .select('*')
            .eq('role', role);
        if (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return data;
    }
    async createAirlineUser(dto) {
        const { data: airline, error: airlineErr } = await this.supabaseService.client
            .from('airlines')
            .select('id, logo')
            .eq('id', dto.airline_id)
            .single();
        if (airlineErr) {
            throw new common_1.HttpException(airlineErr.message, common_1.HttpStatus.BAD_REQUEST);
        }
        const createRes = await this.supabaseService.client.auth.admin.createUser({
            email: dto.email,
            password: dto.password,
            email_confirm: true,
        });
        if (createRes.error) {
            throw new common_1.HttpException(createRes.error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        const authUser = createRes.data.user;
        if (!authUser) {
            throw new common_1.HttpException('Cannot create auth user', common_1.HttpStatus.BAD_REQUEST);
        }
        const { data: user, error: insertErr } = await this.supabaseService.client
            .from('users')
            .insert({
            id: authUser.id,
            email: dto.email,
            full_name: dto.full_name,
            phone: dto.phone ?? null,
            role: 'AIRLINE',
            avatar_url: airline?.logo ?? null,
        })
            .select()
            .single();
        if (insertErr) {
            await this.supabaseService.client.auth.admin.deleteUser(authUser.id);
            throw new common_1.HttpException(insertErr.message, common_1.HttpStatus.BAD_REQUEST);
        }
        const { error: linkErr } = await this.supabaseService.client
            .from('airline_users')
            .insert({ user_id: authUser.id, airline_id: dto.airline_id });
        if (linkErr) {
            throw new common_1.HttpException(linkErr.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return { user, auth_user_id: authUser.id };
    }
    async updateAccountStatus(userId, accountStatus) {
        const { data, error } = await this.supabaseService.client
            .from('users')
            .update({
            account_status: accountStatus,
            updated_at: new Date().toISOString(),
        })
            .eq('id', userId)
            .select()
            .single();
        if (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        const statusMessage = {
            'ACTIVE': 'đã kích hoạt',
            'LOCKED': 'đã khóa'
        };
        return {
            message: `Tài khoản ${statusMessage[accountStatus]} thành công`,
            user: data
        };
    }
    async migrateAllAvatarsToBucket() {
        const { data: users, error } = await this.supabaseService.client
            .from('users')
            .select('id, avatar_url');
        if (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        const results = [];
        for (const user of users || []) {
            const id = user.id;
            const url = user.avatar_url ?? null;
            if (!url) {
                results.push({ id, status: 'skipped', reason: 'no avatar_url' });
                continue;
            }
            if (url.includes('/storage/v1/object/public/avatars/')) {
                results.push({ id, from: url, status: 'skipped', reason: 'already in bucket' });
                continue;
            }
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`download failed: ${response.status} ${response.statusText}`);
                }
                const arrayBuf = await response.arrayBuffer();
                const buffer = Buffer.from(arrayBuf);
                const contentType = response.headers.get('content-type') || 'image/png';
                const extFromType = contentType.split('/').pop() || 'png';
                const urlExt = (url.split('?')[0].split('#')[0].split('.').pop() || '').toLowerCase();
                const fileExt = (urlExt && urlExt.length <= 5) ? urlExt : extFromType;
                const path = `${id}/${id}.${fileExt}`;
                const { error: uploadError } = await this.supabaseService.client
                    .storage
                    .from('avatars')
                    .upload(path, buffer, {
                    upsert: true,
                    contentType,
                });
                if (uploadError) {
                    throw new Error(uploadError.message);
                }
                const { data: publicData } = this.supabaseService.client
                    .storage
                    .from('avatars')
                    .getPublicUrl(path);
                const newUrl = publicData.publicUrl;
                const { error: updateError } = await this.supabaseService.client
                    .from('users')
                    .update({
                    avatar_url: newUrl,
                    updated_at: new Date().toISOString(),
                })
                    .eq('id', id);
                if (updateError) {
                    throw new Error(updateError.message);
                }
                results.push({ id, from: url, to: newUrl, status: 'migrated' });
            }
            catch (e) {
                results.push({ id, from: url, status: 'failed', reason: e?.message || 'unknown' });
            }
        }
        return { message: 'Avatar migration completed', results };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map