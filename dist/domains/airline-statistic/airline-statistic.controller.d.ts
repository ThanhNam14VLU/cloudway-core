import { AirlineStatisticService } from './airline-statistic.service';
export declare class AirlineStatisticController {
    private readonly airlineStatisticService;
    constructor(airlineStatisticService: AirlineStatisticService);
    getAirlineStatistics(airlineId: string): Promise<any>;
}
