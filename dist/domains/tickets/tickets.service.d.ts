import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { SupabaseService } from '../../services/supabase/supabase.service';
export declare class TicketsService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    create(createTicketDto: CreateTicketDto): Promise<any[]>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateTicketDto: UpdateTicketDto): Promise<any[]>;
    remove(id: string): Promise<any[]>;
}
