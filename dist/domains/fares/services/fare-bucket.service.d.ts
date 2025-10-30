import { SupabaseService } from '../../../services/supabase/supabase.service';
import { CreateFareBucketDto } from '../dto/create-fare-bucket.dto';
import { UpdateFareBucketDto } from '../dto/update-fare-bucket.dto';
export declare class FareBucketService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    create(createFareBucketDto: CreateFareBucketDto): Promise<any[]>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateFareBucketDto: UpdateFareBucketDto): Promise<any[]>;
    remove(id: string): Promise<any[]>;
}
