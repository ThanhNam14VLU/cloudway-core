import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { CreateBookingWithPassengersDto } from './dto/create-booking-with-passengers.dto';
import { SupabaseService } from '../../services/supabase/supabase.service';
import { AirlineStatisticService } from '../airline-statistic/airline-statistic.service';
export declare class BookingsService {
    private readonly supabaseService;
    private readonly airlineStatisticService;
    constructor(supabaseService: SupabaseService, airlineStatisticService: AirlineStatisticService);
    private generatePNR;
    private generateSeatNumbers;
    create(createBookingDto: CreateBookingDto): Promise<any[]>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateBookingDto: UpdateBookingDto): Promise<void>;
    remove(id: string): Promise<any[]>;
    createBookingWithPassengers(dto: CreateBookingWithPassengersDto): Promise<{
        message: string;
        booking: {
            id: any;
            pnr_code: string;
            user_id: string | null;
            contact_fullname: string;
            contact_phone: string;
            status: string;
            created_at: any;
            segments: any[];
            payment: {
                id: any;
                amount: number;
                currency: string;
                status: string;
                created_at: any;
            };
        };
    }>;
    private calculateSegmentPrice;
    private reduceAvailableSeats;
    private updateAirlineStatistics;
    getBookingDetails(bookingId: string): Promise<any>;
    getBookingForFrontend(bookingId: string): Promise<{
        booking: {
            id: any;
            pnr_code: any;
            user_id: any;
            contact_info: {
                fullname: any;
                phone: any;
            };
            status: any;
            summary: {
                total_passengers: number;
                total_segments: number;
                is_roundtrip: boolean;
                total_price: any;
                currency: string;
            };
            created_at: any;
            updated_at: any;
        };
        segments: any[];
        payment: {
            id: any;
            amount: any;
            currency: any;
            payment_method: any;
            status: any;
            transaction_id: any;
            paid_at: any;
            created_at: any;
        };
    }>;
    getBookingByPNR(pnrCode: string): Promise<any>;
    getUserBookingHistory(userId: string, options?: {
        limit?: number;
        offset?: number;
        status?: string;
        sortBy?: 'created_at' | 'updated_at';
        sortOrder?: 'asc' | 'desc';
    }): Promise<{
        bookings: {
            id: any;
            pnr_code: any;
            status: any;
            summary: {
                total_passengers: number;
                total_segments: number;
                total_amount: any;
                is_roundtrip: boolean;
                departure_airport: any;
                arrival_airport: any;
                departure_date: any;
                airline: any;
            };
            payment_status: any;
            created_at: any;
            updated_at: any;
        }[];
        pagination: {
            total: number;
            limit: number;
            offset: number;
            has_more: boolean;
        };
    }>;
}
