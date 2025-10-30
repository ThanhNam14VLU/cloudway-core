import { FaresService } from '../services/fares.service';
import { CreateFareDto } from '../dto/create-fare.dto';
import { UpdateFareDto } from '../dto/update-fare.dto';
export declare class FaresController {
    private readonly faresService;
    constructor(faresService: FaresService);
    create(createFareDto: CreateFareDto): Promise<any[]>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateFareDto: UpdateFareDto): Promise<any[]>;
    remove(id: string): Promise<any[]>;
    airlineOnly(): {
        ok: boolean;
    };
}
