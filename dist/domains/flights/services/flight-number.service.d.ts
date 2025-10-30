import { CreateFlightNumberDto } from '../dto/create-flight-number.dto';
import { UpdateFlightNumberDto } from '../dto/update-flight-number.dto';
import { SupabaseService } from '../../../services/supabase/supabase.service';
export declare class FlightNumberService {
    private supabaseService;
    constructor(supabaseService: SupabaseService);
    create(createFlightInstanceDto: CreateFlightNumberDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateFlightDto: UpdateFlightNumberDto): Promise<any>;
    remove(id: string): Promise<any>;
}
