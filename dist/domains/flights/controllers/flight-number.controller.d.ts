import { FlightNumberService } from '../services/flight-number.service';
import { CreateFlightNumberDto } from '../dto/create-flight-number.dto';
import { UpdateFlightNumberDto } from '../dto/update-flight-number.dto';
export declare class FlightNumberController {
    private readonly flightNumberService;
    constructor(flightNumberService: FlightNumberService);
    create(createFlightDto: CreateFlightNumberDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateFlightNumberDto: UpdateFlightNumberDto): Promise<any>;
    remove(id: string): Promise<any>;
}
