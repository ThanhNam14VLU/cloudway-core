import { TaxesFeesService } from './taxes_fees.service';
import { CreateTaxesFeeDto } from './dto/create-taxes_fee.dto';
import { UpdateTaxesFeeDto } from './dto/update-taxes_fee.dto';
export declare class TaxesFeesController {
    private readonly taxesFeesService;
    constructor(taxesFeesService: TaxesFeesService);
    create(createTaxesFeeDto: CreateTaxesFeeDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateTaxesFeeDto: UpdateTaxesFeeDto): Promise<any>;
    remove(id: string): Promise<any>;
}
