import { CreateAircraftDto } from '../dto/create-aircraft.dto';
import { UpdateAircraftDto } from '../dto/update-aircraft.dto';
import { SupabaseService } from '../../../services/supabase/supabase.service';
export declare class AircraftService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    create(createAircraftDto: CreateAircraftDto): Promise<any>;
    update(id: string, updateAircraftDto: UpdateAircraftDto): Promise<any>;
    remove(id: string): Promise<any>;
}
