import { SupabaseService } from '../../services/supabase/supabase.service';
export declare class SepayService {
    private readonly supabaseService;
    private readonly logger;
    constructor(supabaseService: SupabaseService);
    handlePaymentUpdate(data: any): Promise<void>;
}
