import { CreateBookingSegmentDto } from './dto/create-booking-segment.dto';
import { UpdateBookingSegmentDto } from './dto/update-booking-segment.dto';
import { SupabaseService } from '../../services/supabase/supabase.service';
export declare class BookingSegmentsService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    create(createBookingSegmentDto: CreateBookingSegmentDto): Promise<any[]>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateBookingSegmentDto: UpdateBookingSegmentDto): Promise<any[]>;
    remove(id: string): Promise<any[]>;
}
