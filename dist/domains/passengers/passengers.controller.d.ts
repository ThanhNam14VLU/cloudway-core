import { PassengersService } from './passengers.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
export declare class PassengersController {
    private readonly passengersService;
    constructor(passengersService: PassengersService);
    create(createPassengerDto: CreatePassengerDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updatePassengerDto: UpdatePassengerDto): Promise<any>;
    remove(id: string): Promise<any>;
}
