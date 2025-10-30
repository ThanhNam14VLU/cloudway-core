import type { Multer } from 'multer';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<any[]>;
    getProfile(id: string): Promise<any>;
    updateProfile(id: string, body: {
        full_name?: string;
        phone?: string;
        email?: string;
    }): Promise<{
        message: string;
        user: any;
    }>;
    uploadAvatar(id: string, file: Multer.File): Promise<{
        message: string;
        avatar_url: string;
        user: any;
    }>;
    updateRole(id: string, body: {
        role: 'CUSTOMER' | 'AIRLINE';
    }): Promise<{
        message: string;
        user: any;
    }>;
    getUserByRole(role: 'CUSTOMER' | 'AIRLINE' | 'ADMIN'): Promise<any[]>;
    migrateAvatars(): Promise<{
        message: string;
        results: {
            id: string;
            from?: string;
            to?: string;
            status: "skipped" | "migrated" | "failed";
            reason?: string;
        }[];
    }>;
    createAirlineUser(body: {
        email: string;
        full_name: string;
        phone?: string;
        password: string;
        airline_id: string;
    }): Promise<{
        user: any;
        auth_user_id: string;
    }>;
    updateAccountStatus(id: string, body: {
        account_status: 'ACTIVE' | 'LOCKED';
    }): Promise<{
        message: string;
        user: any;
    }>;
}
