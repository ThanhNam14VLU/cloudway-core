export declare class CreateFareDto {
    id: string;
    flight_instance_id: string;
    fare_bucket_id: string;
    passenger_type: string;
    base_price: number;
    baggage_allowance: string;
    change_conditions: string;
    cancellation_conditions: string;
    created_at: Date;
}
