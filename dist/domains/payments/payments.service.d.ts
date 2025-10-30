import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { SupabaseService } from '../../services/supabase/supabase.service';
export declare class PaymentsService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    create(createPaymentDto: CreatePaymentDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<any>;
    private reduceAvailableSeats;
    restoreAvailableSeats(bookingId: string): Promise<void>;
    remove(id: string): Promise<any>;
}
