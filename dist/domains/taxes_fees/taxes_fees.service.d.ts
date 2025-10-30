import { CreateTaxesFeeDto } from './dto/create-taxes_fee.dto';
import { UpdateTaxesFeeDto } from './dto/update-taxes_fee.dto';
import { SupabaseService } from '../../services/supabase/supabase.service';
export declare class TaxesFeesService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    create(createTaxesFeeDto: CreateTaxesFeeDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateTaxesFeeDto: UpdateTaxesFeeDto): Promise<any>;
    remove(id: string): Promise<any>;
}
