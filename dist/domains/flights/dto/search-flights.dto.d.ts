export declare class SearchFlightsDto {
    departure_airport_id: string;
    destination_airport_id: string;
    departure_date: string;
    return_date?: string;
    trip_type: 'oneway' | 'roundtrip';
    adults: number;
    children: number;
    infants: number;
}
