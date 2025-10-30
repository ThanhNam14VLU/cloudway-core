export declare class PassengerInfoDto {
    full_name: string;
    date_of_birth?: string;
    id_number?: string;
    phone?: string;
    email?: string;
    passenger_type: 'ADULT' | 'CHILD' | 'INFANT';
}
export declare class BookingSegmentDto {
    flight_instance_id: string;
    fare_bucket_id: string;
    passengers: PassengerInfoDto[];
}
export declare class CreateBookingWithPassengersDto {
    user_id?: string;
    contact_fullname: string;
    contact_phone: string;
    segments: BookingSegmentDto[];
}
