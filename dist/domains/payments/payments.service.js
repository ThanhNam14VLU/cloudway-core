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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../../services/supabase/supabase.service");
let PaymentsService = class PaymentsService {
    supabaseService;
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async create(createPaymentDto) {
        const { data, error } = await this.supabaseService.client
            .from('payments')
            .insert(createPaymentDto)
            .select()
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async findAll() {
        const { data, error } = await this.supabaseService.client
            .from('payments')
            .select('*');
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async findOne(id) {
        const { data, error } = await this.supabaseService.client
            .from('payments')
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async update(id, updatePaymentDto) {
        const { data: currentPayment, error: fetchError } = await this.supabaseService.client
            .from('payments')
            .select('status, booking_id')
            .eq('id', id)
            .single();
        if (fetchError) {
            throw new Error(fetchError.message);
        }
        const { data, error } = await this.supabaseService.client
            .from('payments')
            .update(updatePaymentDto)
            .eq('id', id)
            .select()
            .single();
        if (error) {
            throw new Error(error.message);
        }
        if (currentPayment.status === 'PENDING' && updatePaymentDto.status === 'PAID') {
            await this.reduceAvailableSeats(currentPayment.booking_id);
            await this.supabaseService.client
                .from('bookings')
                .update({ status: 'CONFIRMED' })
                .eq('id', currentPayment.booking_id);
        }
        if (currentPayment.status === 'PENDING' && updatePaymentDto.status === 'FAILED') {
            await this.supabaseService.client
                .from('bookings')
                .update({ status: 'CANCELLED' })
                .eq('id', currentPayment.booking_id);
        }
        return data;
    }
    async reduceAvailableSeats(bookingId) {
        const { data: segments, error: segmentsError } = await this.supabaseService.client
            .from('booking_segments')
            .select(`
        flight_instance_id,
        fare_bucket_id,
        passengers (id)
      `)
            .eq('booking_id', bookingId);
        if (segmentsError) {
            throw new Error(`Lỗi lấy segments: ${segmentsError.message}`);
        }
        for (const segment of segments || []) {
            const passengerCount = segment.passengers?.length || 0;
            if (passengerCount > 0) {
                const { data: inventory, error: invError } = await this.supabaseService.client
                    .from('inventories')
                    .select('id, available_seats')
                    .eq('flight_instance_id', segment.flight_instance_id)
                    .eq('fare_bucket_id', segment.fare_bucket_id)
                    .single();
                if (invError) {
                    console.warn(`Không tìm thấy inventory cho segment ${segment.flight_instance_id}, ${segment.fare_bucket_id}`);
                    continue;
                }
                const newAvailableSeats = Math.max(0, inventory.available_seats - passengerCount);
                const { error: updateError } = await this.supabaseService.client
                    .from('inventories')
                    .update({
                    available_seats: newAvailableSeats,
                    updated_at: new Date().toISOString()
                })
                    .eq('id', inventory.id);
                if (updateError) {
                    throw new Error(`Lỗi cập nhật inventory: ${updateError.message}`);
                }
            }
        }
    }
    async restoreAvailableSeats(bookingId) {
        const { data: segments, error: segmentsError } = await this.supabaseService.client
            .from('booking_segments')
            .select(`
        flight_instance_id,
        fare_bucket_id,
        passengers (id)
      `)
            .eq('booking_id', bookingId);
        if (segmentsError) {
            throw new Error(`Lỗi lấy segments: ${segmentsError.message}`);
        }
        for (const segment of segments || []) {
            const passengerCount = segment.passengers?.length || 0;
            if (passengerCount > 0) {
                const { data: inventory, error: invError } = await this.supabaseService.client
                    .from('inventories')
                    .select('id, available_seats, total_seats')
                    .eq('flight_instance_id', segment.flight_instance_id)
                    .eq('fare_bucket_id', segment.fare_bucket_id)
                    .single();
                if (invError) {
                    console.warn(`Không tìm thấy inventory cho segment ${segment.flight_instance_id}, ${segment.fare_bucket_id}`);
                    continue;
                }
                const newAvailableSeats = Math.min(inventory.total_seats, inventory.available_seats + passengerCount);
                const { error: updateError } = await this.supabaseService.client
                    .from('inventories')
                    .update({
                    available_seats: newAvailableSeats,
                    updated_at: new Date().toISOString()
                })
                    .eq('id', inventory.id);
                if (updateError) {
                    throw new Error(`Lỗi cập nhật inventory: ${updateError.message}`);
                }
            }
        }
    }
    async remove(id) {
        const { data, error } = await this.supabaseService.client
            .from('payments')
            .delete()
            .eq('id', id)
            .select()
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map