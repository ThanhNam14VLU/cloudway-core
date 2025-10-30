import { CreateFareDto } from '../dto/create-fare.dto';
import { UpdateFareDto } from '../dto/update-fare.dto';
import { SupabaseService } from '../../../services/supabase/supabase.service';
export declare class FaresService {
    private supabaseService;
    constructor(supabaseService: SupabaseService);
    create(createFareDto: CreateFareDto): Promise<any[]>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateFareDto: UpdateFareDto): Promise<any[]>;
    remove(id: string): Promise<any[]>;
}
