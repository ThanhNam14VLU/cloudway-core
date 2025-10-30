import { AirportService } from '../services/airport.service';
import { CreateAirportDto } from '../dto/create-airport.dto';
import { UpdateAirportDto } from '../dto/update-airport.dto';
export declare class AirportController {
    private readonly airportService;
    constructor(airportService: AirportService);
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    create(createAirporDto: CreateAirportDto): Promise<any>;
    update(id: string, updateAirportDto: UpdateAirportDto): Promise<void>;
    remove(id: string): Promise<void>;
}
