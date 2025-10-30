import { AircraftService } from '../services/aircraft.service';
import { CreateAircraftDto } from '../dto/create-aircraft.dto';
import { UpdateAircraftDto } from '../dto/update-aircraft.dto';
export declare class AircraftController {
    private readonly aircraftService;
    constructor(aircraftService: AircraftService);
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    create(createAirportDto: CreateAircraftDto): Promise<any>;
    update(id: string, updateAircraftDto: UpdateAircraftDto): Promise<any>;
    remove(id: string): Promise<any>;
}
