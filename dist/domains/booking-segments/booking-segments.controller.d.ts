import { BookingSegmentsService } from './booking-segments.service';
import { CreateBookingSegmentDto } from './dto/create-booking-segment.dto';
import { UpdateBookingSegmentDto } from './dto/update-booking-segment.dto';
export declare class BookingSegmentsController {
    private readonly bookingSegmentsService;
    constructor(bookingSegmentsService: BookingSegmentsService);
    create(createBookingSegmentDto: CreateBookingSegmentDto): Promise<any[]>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateBookingSegmentDto: UpdateBookingSegmentDto): Promise<any[]>;
    remove(id: string): Promise<any[]>;
}
