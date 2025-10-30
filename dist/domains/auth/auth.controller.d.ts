import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    supabaseLogin(token: string): Promise<{
        message: string;
        user: import("../user/entities/user.entity").User;
    }>;
    me(req: any): Promise<{
        user: any;
    }>;
    adminOnly(): {
        ok: boolean;
    };
    airlineOnly(): {
        ok: boolean;
    };
    customerOnly(): {
        ok: boolean;
    };
    supabaseRegister(token: string): Promise<{
        message: string;
        user: import("../user/entities/user.entity").User;
        supabase_user: {
            id: string;
            email: string | undefined;
            phone: any;
        };
    }>;
}
