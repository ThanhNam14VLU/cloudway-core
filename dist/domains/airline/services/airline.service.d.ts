import { CreateAirlineDto } from '../dto/create-airline.dto';
import { UpdateAirlineDto } from '../dto/update-airline.dto';
import { SupabaseService } from '../../../services/supabase/supabase.service';
export declare class AirlineService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    create(createAirlineDto: CreateAirlineDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateAirlineDto: UpdateAirlineDto): Promise<any>;
    remove(id: string): Promise<any>;
}
