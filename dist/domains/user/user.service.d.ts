import { SupabaseService } from '../../services/supabase/supabase.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import type { Multer } from 'multer';
export declare class UserService {
    private supabaseService;
    private readonly userRepo;
    constructor(supabaseService: SupabaseService, userRepo: Repository<User>);
    findAll(): Promise<any[]>;
    getProfile(id: string): Promise<any>;
    upsertUser(data: {
        id: string;
        email: string;
        full_name: string;
        avatar_url?: string;
        role?: 'CUSTOMER' | 'AIRLINE' | 'ADMIN';
        phone?: string;
    }): Promise<User>;
    remove(id: string): Promise<any>;
    login(udto: {
        email: string;
        password_hash: string;
    }): Promise<{
        message: string;
    }>;
    updateProfile(id: string, updateData: {
        full_name?: string;
        phone?: string;
        email?: string;
    }): Promise<{
        message: string;
        user: any;
    }>;
    updateAvatar(id: string, file: Multer.File): Promise<{
        message: string;
        avatar_url: string;
        user: any;
    }>;
    updateRole(id: string, newRole: 'CUSTOMER' | 'AIRLINE'): Promise<{
        message: string;
        user: any;
    }>;
    getUserByRole(role: 'CUSTOMER' | 'AIRLINE' | 'ADMIN'): Promise<any[]>;
    createAirlineUser(dto: {
        email: string;
        full_name: string;
        phone?: string;
        password: string;
        airline_id: string;
    }): Promise<{
        user: any;
        auth_user_id: string;
    }>;
    updateAccountStatus(userId: string, accountStatus: 'ACTIVE' | 'LOCKED'): Promise<{
        message: string;
        user: any;
    }>;
    migrateAllAvatarsToBucket(): Promise<{
        message: string;
        results: {
            id: string;
            from?: string;
            to?: string;
            status: "skipped" | "migrated" | "failed";
            reason?: string;
        }[];
    }>;
}
