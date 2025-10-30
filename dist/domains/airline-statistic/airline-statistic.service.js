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
exports.AirlineStatisticService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../../services/supabase/supabase.service");
let AirlineStatisticService = class AirlineStatisticService {
    supabaseService;
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async updateStatisticsOnBooking(airlineId, passengerCount, revenue) {
        const { data: existingStat, error: findError } = await this.supabaseService.client
            .from('airline_statistics')
            .select('*')
            .eq('airline_id', airlineId)
            .single();
        if (findError && findError.code !== 'PGRST116') {
            throw new Error(`Lỗi tìm thống kê airline: ${findError.message}`);
        }
        if (existingStat) {
            const { error: updateError } = await this.supabaseService.client
                .from('airline_statistics')
                .update({
                total_passengers: existingStat.total_passengers + passengerCount,
                total_revenue: parseFloat(existingStat.total_revenue) + revenue,
                updated_at: new Date().toISOString(),
            })
                .eq('airline_id', airlineId);
            if (updateError) {
                throw new Error(`Lỗi cập nhật thống kê: ${updateError.message}`);
            }
        }
        else {
            const { error: insertError } = await this.supabaseService.client
                .from('airline_statistics')
                .insert({
                airline_id: airlineId,
                total_passengers: passengerCount,
                total_revenue: revenue,
                total_flights: 0,
                cancelled_flights: 0,
                on_time_flights: 0,
            });
            if (insertError) {
                throw new Error(`Lỗi tạo thống kê mới: ${insertError.message}`);
            }
        }
    }
    async updateStatisticsOnFlight(airlineId, isOnTime = true) {
        const { data: existingStat, error: findError } = await this.supabaseService.client
            .from('airline_statistics')
            .select('*')
            .eq('airline_id', airlineId)
            .single();
        if (findError && findError.code !== 'PGRST116') {
            throw new Error(`Lỗi tìm thống kê airline: ${findError.message}`);
        }
        if (existingStat) {
            const updateData = {
                total_flights: existingStat.total_flights + 1,
                updated_at: new Date().toISOString(),
            };
            if (isOnTime) {
                updateData.on_time_flights = existingStat.on_time_flights + 1;
            }
            const { error: updateError } = await this.supabaseService.client
                .from('airline_statistics')
                .update(updateData)
                .eq('airline_id', airlineId);
            if (updateError) {
                throw new Error(`Lỗi cập nhật thống kê chuyến bay: ${updateError.message}`);
            }
        }
        else {
            const { error: insertError } = await this.supabaseService.client
                .from('airline_statistics')
                .insert({
                airline_id: airlineId,
                total_flights: 1,
                on_time_flights: isOnTime ? 1 : 0,
                total_passengers: 0,
                total_revenue: 0,
                cancelled_flights: 0,
            });
            if (insertError) {
                throw new Error(`Lỗi tạo thống kê chuyến bay: ${insertError.message}`);
            }
        }
    }
    async updateStatisticsOnFlightCancellation(airlineId) {
        const { data: existingStat, error: findError } = await this.supabaseService.client
            .from('airline_statistics')
            .select('*')
            .eq('airline_id', airlineId)
            .single();
        if (findError && findError.code !== 'PGRST116') {
            throw new Error(`Lỗi tìm thống kê airline: ${findError.message}`);
        }
        if (existingStat) {
            const { error: updateError } = await this.supabaseService.client
                .from('airline_statistics')
                .update({
                cancelled_flights: existingStat.cancelled_flights + 1,
                updated_at: new Date().toISOString(),
            })
                .eq('airline_id', airlineId);
            if (updateError) {
                throw new Error(`Lỗi cập nhật thống kê hủy chuyến bay: ${updateError.message}`);
            }
        }
        else {
            const { error: insertError } = await this.supabaseService.client
                .from('airline_statistics')
                .insert({
                airline_id: airlineId,
                total_flights: 0,
                on_time_flights: 0,
                total_passengers: 0,
                total_revenue: 0,
                cancelled_flights: 1,
            });
            if (insertError) {
                throw new Error(`Lỗi tạo thống kê hủy chuyến bay: ${insertError.message}`);
            }
        }
    }
    async getAirlineStatistics(airlineId) {
        const { data, error } = await this.supabaseService.client
            .from('airline_statistics')
            .select('*')
            .eq('airline_id', airlineId)
            .single();
        if (error && error.code !== 'PGRST116') {
            throw new Error(`Lỗi lấy thống kê: ${error.message}`);
        }
        return data || {
            airline_id: airlineId,
            total_flights: 0,
            total_passengers: 0,
            total_revenue: 0,
            cancelled_flights: 0,
            on_time_flights: 0,
        };
    }
};
exports.AirlineStatisticService = AirlineStatisticService;
exports.AirlineStatisticService = AirlineStatisticService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], AirlineStatisticService);
//# sourceMappingURL=airline-statistic.service.js.map