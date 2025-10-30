import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { SupabaseService } from '../../services/supabase/supabase.service';
export declare class PassengersService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    create(createPassengerDto: CreatePassengerDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updatePassengerDto: UpdatePassengerDto): Promise<any>;
    remove(id: string): Promise<any>;
}
