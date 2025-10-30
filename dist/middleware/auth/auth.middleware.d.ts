import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { SupabaseService } from '../../services/supabase/supabase.service';
export declare class AuthMiddleware implements NestMiddleware {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    use(req: Request, res: Response, next: () => void): Promise<void | Response<any, Record<string, any>>>;
    private extractTokenFromHeader;
}
