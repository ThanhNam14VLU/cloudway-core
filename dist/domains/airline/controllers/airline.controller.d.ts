import { AirlineService } from '../services/airline.service';
import { CreateAirlineDto } from '../dto/create-airline.dto';
import { UpdateAirlineDto } from '../dto/update-airline.dto';
export declare class AirlineController {
    private readonly airlineService;
    constructor(airlineService: AirlineService);
    create(createAirlineDto: CreateAirlineDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateAirlineDto: UpdateAirlineDto): Promise<any>;
    remove(id: string): Promise<any>;
}
