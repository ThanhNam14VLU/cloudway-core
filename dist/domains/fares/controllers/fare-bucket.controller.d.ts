import { CreateFareBucketDto } from '../dto/create-fare-bucket.dto';
import { UpdateFareBucketDto } from '../dto/update-fare-bucket.dto';
import { FareBucketService } from '../services/fare-bucket.service';
export declare class FareBucketController {
    private readonly fareBucketService;
    constructor(fareBucketService: FareBucketService);
    create(createFareBucketDto: CreateFareBucketDto): Promise<any[]>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateFareBucketDto: UpdateFareBucketDto): Promise<any[]>;
    remove(id: string): Promise<any[]>;
    airlineOnly(): {
        ok: boolean;
    };
}
