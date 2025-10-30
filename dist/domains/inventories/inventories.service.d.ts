import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { SupabaseService } from '../../services/supabase/supabase.service';
export declare class InventoriesService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    create(createInventoryDto: CreateInventoryDto): Promise<any[]>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateInventoryDto: UpdateInventoryDto): Promise<any[]>;
    remove(id: string): Promise<any[]>;
}
