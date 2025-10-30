import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { CreateBookingWithPassengersDto } from './dto/create-booking-with-passengers.dto';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    create(createBookingDto: CreateBookingDto): Promise<any[]>;
    createWithPassengers(dto: CreateBookingWithPassengersDto): Promise<{
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
    findAll(): Promise<any[]>;
    findByPNR(pnrCode: string): Promise<any>;
    getUserBookingHistory(userId: string, limit?: number, offset?: number, status?: string, sortBy?: 'created_at' | 'updated_at', sortOrder?: 'asc' | 'desc'): Promise<{
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
    getBookingForFrontend(id: string): Promise<{
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
    update(id: string, updateBookingDto: UpdateBookingDto): Promise<void>;
    remove(id: string): Promise<any[]>;
}
