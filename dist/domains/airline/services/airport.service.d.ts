import { SupabaseService } from '../../../services/supabase/supabase.service';
import { CreateAirportDto } from '../dto/create-airport.dto';
import { UpdateAirportDto } from '../dto/update-airport.dto';
export declare class AirportService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    create(createAirportDto: CreateAirportDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateAirportDto: UpdateAirportDto): Promise<void>;
    remove(id: string): Promise<void>;
}
