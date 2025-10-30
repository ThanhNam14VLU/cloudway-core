import { UserService } from '../user/user.service';
import { SupabaseService } from '../../services/supabase/supabase.service';
export declare class AuthService {
    private readonly userService;
    private readonly supabaseService;
    constructor(userService: UserService, supabaseService: SupabaseService);
    supabaseLogin(token: string): Promise<{
        message: string;
        user: import("../user/entities/user.entity").User;
    }>;
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
