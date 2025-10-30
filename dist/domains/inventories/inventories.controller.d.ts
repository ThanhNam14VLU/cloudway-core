import { InventoriesService } from './inventories.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
export declare class InventoriesController {
    private readonly inventoriesService;
    constructor(inventoriesService: InventoriesService);
    create(createInventoryDto: CreateInventoryDto): Promise<any[]>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateInventoryDto: UpdateInventoryDto): Promise<any[]>;
    remove(id: string): Promise<any[]>;
    airlineOnly(): {
        ok: boolean;
    };
}
