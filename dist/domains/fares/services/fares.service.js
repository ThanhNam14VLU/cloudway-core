"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaresService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../../../services/supabase/supabase.service");
let FaresService = class FaresService {
    supabaseService;
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async create(createFareDto) {
        const { data, error } = await this.supabaseService.client
            .from('fares')
            .insert(createFareDto)
            .select();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async findAll() {
        const { data, error } = await this.supabaseService.client
            .from('fares')
            .select('*');
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async findOne(id) {
        const { data, error } = await this.supabaseService.client
            .from('fares')
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async update(id, updateFareDto) {
        const { data, error } = await this.supabaseService.client
            .from('fares')
            .update(updateFareDto)
            .eq('id', id)
            .select();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async remove(id) {
        const { data, error } = await this.supabaseService.client
            .from('fares')
            .delete()
            .eq('id', id)
            .select();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
};
exports.FaresService = FaresService;
exports.FaresService = FaresService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], FaresService);
//# sourceMappingURL=fares.service.js.map