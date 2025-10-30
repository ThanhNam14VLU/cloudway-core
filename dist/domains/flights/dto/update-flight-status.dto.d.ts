import { FlightStatus } from '../../../common/enums/flight-status.enum';
export declare class UpdateFlightStatusDto {
    status: FlightStatus;
    actual_departure_local?: string;
    actual_arrival_local?: string;
}
