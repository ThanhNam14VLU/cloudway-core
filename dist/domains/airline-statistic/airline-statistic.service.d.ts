import { SupabaseService } from '../../services/supabase/supabase.service';
export declare class AirlineStatisticService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    updateStatisticsOnBooking(airlineId: string, passengerCount: number, revenue: number): Promise<void>;
    updateStatisticsOnFlight(airlineId: string, isOnTime?: boolean): Promise<void>;
    updateStatisticsOnFlightCancellation(airlineId: string): Promise<void>;
    getAirlineStatistics(airlineId: string): Promise<any>;
}
