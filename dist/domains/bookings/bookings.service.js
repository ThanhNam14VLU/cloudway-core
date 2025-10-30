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
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../../services/supabase/supabase.service");
const airline_statistic_service_1 = require("../airline-statistic/airline-statistic.service");
let BookingsService = class BookingsService {
    supabaseService;
    airlineStatisticService;
    constructor(supabaseService, airlineStatisticService) {
        this.supabaseService = supabaseService;
        this.airlineStatisticService = airlineStatisticService;
    }
    generatePNR() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let pnr = '';
        for (let i = 0; i < 6; i++) {
            pnr += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return pnr;
    }
    async generateSeatNumbers(flightInstanceId, passengers) {
        const { data: flightInstance } = await this.supabaseService.client
            .from('flight_instances')
            .select(`
        aircraft:aircraft_id (
          seat_capacity
        )
      `)
            .eq('id', flightInstanceId)
            .single();
        if (!flightInstance?.aircraft) {
            throw new common_1.BadRequestException('Không tìm thấy thông tin máy bay');
        }
        const seatCapacity = flightInstance.aircraft.seat_capacity;
        const rows = Math.ceil(seatCapacity / 6);
        const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
        const { data: bookedSeats } = await this.supabaseService.client
            .from('passengers')
            .select(`
        seat_number,
        booking_segment:booking_segment_id (
          flight_instance_id
        )
      `)
            .not('seat_number', 'is', null);
        const occupiedSeats = new Set(bookedSeats
            ?.filter(p => p.booking_segment?.flight_instance_id === flightInstanceId)
            ?.map(p => p.seat_number) || []);
        const availableSeats = [];
        for (let row = 1; row <= rows; row++) {
            for (const letter of seatLetters) {
                const seatNumber = `${row}${letter}`;
                if (!occupiedSeats.has(seatNumber)) {
                    availableSeats.push(seatNumber);
                }
            }
        }
        if (availableSeats.length < passengers.length) {
            throw new common_1.BadRequestException(`Không đủ ghế trống. Còn ${availableSeats.length} ghế nhưng cần ${passengers.length} ghế`);
        }
        return passengers.map((_, index) => availableSeats[index]);
    }
    async create(createBookingDto) {
        const { data, error } = await this.supabaseService.client
            .from('bookings')
            .insert(createBookingDto)
            .select();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async findAll() {
        const { data, error } = await this.supabaseService.client
            .from('bookings')
            .select('*');
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async findOne(id) {
        const { data, error } = await this.supabaseService.client
            .from('bookings')
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async update(id, updateBookingDto) {
        const { data, error } = await this.supabaseService.client
            .from('bookings')
            .update(updateBookingDto)
            .eq('id', id)
            .select();
        if (error) {
            throw new Error(error.message);
        }
    }
    async remove(id) {
        const { data, error } = await this.supabaseService.client
            .from('bookings')
            .delete()
            .eq('id', id)
            .select();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async createBookingWithPassengers(dto) {
        const { user_id, contact_fullname, contact_phone, segments } = dto;
        let pnrCode = this.generatePNR();
        let isUnique = false;
        let attempts = 0;
        while (!isUnique && attempts < 10) {
            const { data: existing } = await this.supabaseService.client
                .from('bookings')
                .select('pnr_code')
                .eq('pnr_code', pnrCode)
                .maybeSingle();
            if (!existing) {
                isUnique = true;
            }
            else {
                pnrCode = this.generatePNR();
                attempts++;
            }
        }
        if (!isUnique) {
            throw new common_1.BadRequestException('Không thể generate PNR code. Vui lòng thử lại.');
        }
        const { data: booking, error: bookingError } = await this.supabaseService.client
            .from('bookings')
            .insert({
            pnr_code: pnrCode,
            user_id: user_id || null,
            contact_fullname,
            contact_phone,
            status: 'HOLD'
        })
            .select()
            .single();
        if (bookingError) {
            throw new common_1.BadRequestException(`Lỗi tạo booking: ${bookingError.message}`);
        }
        const bookingId = booking.id;
        const createdSegments = [];
        let totalAmount = 0;
        for (const segment of segments) {
            const { data: bookingSegment, error: segmentError } = await this.supabaseService.client
                .from('booking_segments')
                .insert({
                booking_id: bookingId,
                flight_instance_id: segment.flight_instance_id,
                fare_bucket_id: segment.fare_bucket_id
            })
                .select()
                .single();
            if (segmentError) {
                await this.supabaseService.client
                    .from('bookings')
                    .delete()
                    .eq('id', bookingId);
                throw new common_1.BadRequestException(`Lỗi tạo segment: ${segmentError.message}`);
            }
            const segmentId = bookingSegment.id;
            const segmentPrice = await this.calculateSegmentPrice(segment.flight_instance_id, segment.fare_bucket_id, segment.passengers);
            totalAmount += segmentPrice;
            const passengerRecords = await this.generateSeatNumbers(segment.flight_instance_id, segment.passengers).then(seatNumbers => segment.passengers.map((passenger, index) => ({
                booking_segment_id: segmentId,
                full_name: passenger.full_name,
                date_of_birth: passenger.date_of_birth || null,
                id_number: passenger.id_number || null,
                phone: passenger.phone || null,
                email: passenger.email || null,
                passenger_type: passenger.passenger_type,
                seat_number: seatNumbers[index]
            })));
            const { data: passengers, error: passengersError } = await this.supabaseService.client
                .from('passengers')
                .insert(passengerRecords)
                .select();
            if (passengersError) {
                await this.supabaseService.client
                    .from('bookings')
                    .delete()
                    .eq('id', bookingId);
                throw new common_1.BadRequestException(`Lỗi tạo passengers: ${passengersError.message}`);
            }
            createdSegments.push({
                ...bookingSegment,
                passengers: passengers || [],
                price: segmentPrice
            });
        }
        const { data: payment, error: paymentError } = await this.supabaseService.client
            .from('payments')
            .insert({
            booking_id: bookingId,
            amount: totalAmount,
            currency: 'VND',
            payment_method: 'PENDING',
            status: 'PENDING'
        })
            .select()
            .single();
        if (paymentError) {
            await this.supabaseService.client
                .from('bookings')
                .delete()
                .eq('id', bookingId);
            throw new common_1.BadRequestException(`Lỗi tạo payment: ${paymentError.message}`);
        }
        await this.reduceAvailableSeats(bookingId);
        await this.updateAirlineStatistics(createdSegments, totalAmount);
        return {
            message: '✅ Tạo booking thành công',
            booking: {
                id: bookingId,
                pnr_code: pnrCode,
                user_id: user_id || null,
                contact_fullname,
                contact_phone,
                status: 'HOLD',
                created_at: booking.created_at,
                segments: createdSegments,
                payment: {
                    id: payment.id,
                    amount: totalAmount,
                    currency: 'VND',
                    status: 'PENDING',
                    created_at: payment.created_at
                }
            }
        };
    }
    async calculateSegmentPrice(flightInstanceId, fareBucketId, passengers) {
        const { data: fare } = await this.supabaseService.client
            .from('fares')
            .select('base_price')
            .eq('flight_instance_id', flightInstanceId)
            .eq('fare_bucket_id', fareBucketId)
            .maybeSingle();
        if (!fare) {
            throw new common_1.BadRequestException('Không tìm thấy giá vé cho hạng vé này');
        }
        const basePrice = parseFloat(fare.base_price);
        const totalPassengers = passengers.length;
        const totalPrice = basePrice * totalPassengers;
        return totalPrice;
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
            throw new common_1.BadRequestException(`Lỗi lấy segments: ${segmentsError.message}`);
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
                    throw new common_1.BadRequestException(`Lỗi cập nhật inventory: ${updateError.message}`);
                }
            }
        }
    }
    async updateAirlineStatistics(segments, totalAmount) {
        const airlineStats = new Map();
        for (const segment of segments) {
            const { data: flightInstance, error: flightError } = await this.supabaseService.client
                .from('flight_instances')
                .select(`
          flight_number:flight_number_id (
            airline_id
          )
        `)
                .eq('id', segment.flight_instance_id)
                .single();
            if (flightError) {
                console.warn(`Không tìm thấy flight instance ${segment.flight_instance_id}:`, flightError.message);
                continue;
            }
            const airlineId = flightInstance.flight_number?.airline_id;
            if (!airlineId) {
                console.warn(`Không tìm thấy airline_id cho segment ${segment.id}`);
                continue;
            }
            const passengerCount = segment.passengers?.length || 0;
            const segmentRevenue = segment.price || 0;
            if (airlineStats.has(airlineId)) {
                const existing = airlineStats.get(airlineId);
                existing.passengerCount += passengerCount;
                existing.revenue += segmentRevenue;
            }
            else {
                airlineStats.set(airlineId, {
                    passengerCount,
                    revenue: segmentRevenue,
                });
            }
        }
        for (const [airlineId, stats] of airlineStats) {
            try {
                await this.airlineStatisticService.updateStatisticsOnBooking(airlineId, stats.passengerCount, stats.revenue);
            }
            catch (error) {
                console.error(`Lỗi cập nhật thống kê airline ${airlineId}:`, error);
            }
        }
    }
    async getBookingDetails(bookingId) {
        const { data: booking, error } = await this.supabaseService.client
            .from('bookings')
            .select(`
            *,
            booking_segments (
              *,
              flight_instance:flight_instance_id (
                id,
                scheduled_departure_local,
                scheduled_arrival_local,
                flight_number:flight_number_id (
                  code,
                  departure_airport:departure_airport_id (iata_code, city),
                  arrival_airport:arrival_airport_id (iata_code, city),
                  airline:airline_id (name, logo)
                )
              ),
              fare_bucket:fare_bucket_id (code, class),
              passengers (
                id,
                full_name,
                date_of_birth,
                passenger_type,
                phone,
                email
              )
            ),
            payments (
              id,
              amount,
              currency,
              payment_method,
              status,
              transaction_id,
              paid_at,
              created_at
            )
          `)
            .eq('id', bookingId)
            .single();
        if (error) {
            throw new common_1.BadRequestException(`Không tìm thấy booking: ${error.message}`);
        }
        return booking;
    }
    async getBookingForFrontend(bookingId) {
        const { data: booking, error } = await this.supabaseService.client
            .from('bookings')
            .select(`
            id,
            pnr_code,
            user_id,
            contact_fullname,
            contact_phone,
            status,
            created_at,
            updated_at,
            booking_segments (
              id,
              created_at,
              flight_instance:flight_instance_id (
                id,
                scheduled_departure_local,
                scheduled_arrival_local,
                aircraft:aircraft_id (
                  id,
                  type,
                  seat_capacity
                ),
                flight_number:flight_number_id (
                  code,
                  departure_airport:departure_airport_id (
                    id,
                    iata_code,
                    name,
                    city,
                    country
                  ),
                  arrival_airport:arrival_airport_id (
                    id,
                    iata_code,
                    name,
                    city,
                    country
                  ),
                  airline:airline_id (
                    id,
                    name,
                    iata_code,
                    logo
                  )
                ),
                fares (
                  id,
                  base_price,
                  fare_bucket:fare_bucket_id (
                    id,
                    code,
                    class_type,
                    description
                  )
                )
              ),
              fare_bucket:fare_bucket_id (
                id,
                code,
                class_type,
                description
              ),
              passengers (
                id,
                full_name,
                date_of_birth,
                id_number,
                phone,
                email,
                passenger_type,
                created_at
              )
            ),
            payments (
              id,
              amount,
              currency,
              payment_method,
              status,
              transaction_id,
              paid_at,
              created_at
            )
          `)
            .eq('id', bookingId)
            .single();
        if (error) {
            throw new common_1.BadRequestException(`Không tìm thấy booking: ${error.message}`);
        }
        const totalPassengers = booking.booking_segments?.reduce((total, segment) => {
            return total + (segment.passengers?.length || 0);
        }, 0) || 0;
        const totalSegments = booking.booking_segments?.length || 0;
        const segmentsWithDuration = booking.booking_segments?.map((segment) => {
            const departure = new Date(segment.flight_instance.scheduled_departure_local);
            const arrival = new Date(segment.flight_instance.scheduled_arrival_local);
            const durationMinutes = Math.floor((arrival.getTime() - departure.getTime()) / (1000 * 60));
            const hours = Math.floor(durationMinutes / 60);
            const minutes = durationMinutes % 60;
            const segmentFare = segment.flight_instance.fares?.find((fare) => fare.fare_bucket_id === segment.fare_bucket_id);
            const basePrice = segmentFare?.base_price || 0;
            const passengersWithPrice = segment.passengers?.map((passenger) => {
                let passengerPrice = basePrice;
                if (passenger.passenger_type === 'CHILD') {
                    passengerPrice = basePrice * 0.75;
                }
                else if (passenger.passenger_type === 'INFANT') {
                    passengerPrice = basePrice * 0.1;
                }
                return {
                    ...passenger,
                    pricing: {
                        base_price: basePrice,
                        passenger_price: passengerPrice,
                        passenger_type: passenger.passenger_type,
                        currency: 'VND'
                    }
                };
            }) || [];
            const segmentTotalPrice = passengersWithPrice.reduce((total, passenger) => {
                return total + passenger.pricing.passenger_price;
            }, 0);
            return {
                ...segment,
                duration: {
                    hours,
                    minutes,
                    total_minutes: durationMinutes,
                    formatted: `${hours}h ${minutes}m`
                },
                pricing: {
                    base_price: basePrice,
                    segment_total: segmentTotalPrice,
                    currency: 'VND',
                    fare_bucket: segment.fare_bucket,
                    fare_details: segmentFare
                },
                passengers: passengersWithPrice
            };
        });
        const totalBookingPrice = segmentsWithDuration?.reduce((total, segment) => {
            return total + segment.pricing.segment_total;
        }, 0) || 0;
        return {
            booking: {
                id: booking.id,
                pnr_code: booking.pnr_code,
                user_id: booking.user_id,
                contact_info: {
                    fullname: booking.contact_fullname,
                    phone: booking.contact_phone
                },
                status: booking.status,
                summary: {
                    total_passengers: totalPassengers,
                    total_segments: totalSegments,
                    is_roundtrip: totalSegments > 1,
                    total_price: totalBookingPrice,
                    currency: 'VND'
                },
                created_at: booking.created_at,
                updated_at: booking.updated_at
            },
            segments: segmentsWithDuration,
            payment: booking.payments?.[0] || null
        };
    }
    async getBookingByPNR(pnrCode) {
        const { data: booking, error } = await this.supabaseService.client
            .from('bookings')
            .select(`
        *,
        booking_segments (
          *,
          flight_instance:flight_instance_id (
            id,
            scheduled_departure_local,
            scheduled_arrival_local,
            flight_number:flight_number_id (
              code,
              departure_airport:departure_airport_id (iata_code, city, name),
              arrival_airport:arrival_airport_id (iata_code, city, name),
              airline:airline_id (name, logo, iata_code)
            )
          ),
          fare_bucket:fare_bucket_id (code, class),
          passengers (
            id,
            full_name,
            date_of_birth,
            passenger_type,
            phone,
            email
          )
        ),
        payments (
          id,
          amount,
          currency,
          payment_method,
          status,
          transaction_id,
          paid_at,
          created_at
        )
      `)
            .eq('pnr_code', pnrCode.toUpperCase())
            .single();
        if (error) {
            throw new common_1.BadRequestException(`Không tìm thấy booking với PNR: ${pnrCode}`);
        }
        return booking;
    }
    async getUserBookingHistory(userId, options) {
        const { limit = 20, offset = 0, status, sortBy = 'created_at', sortOrder = 'desc' } = options || {};
        let query = this.supabaseService.client
            .from('bookings')
            .select(`
        id,
        pnr_code,
        user_id,
        contact_fullname,
        contact_phone,
        status,
        created_at,
        updated_at,
        booking_segments (
          id,
          flight_instance:flight_instance_id (
            id,
            scheduled_departure_local,
            scheduled_arrival_local,
            flight_number:flight_number_id (
              code,
              departure_airport:departure_airport_id (iata_code, city, name),
              arrival_airport:arrival_airport_id (iata_code, city, name),
              airline:airline_id (name, logo, iata_code)
            )
          ),
          fare_bucket:fare_bucket_id (code, class_type, description),
          passengers (
            id,
            full_name,
            passenger_type,
            seat_number
          )
        ),
        payments (
          id,
          amount,
          currency,
          payment_method,
          status,
          paid_at,
          created_at
        )
      `)
            .eq('user_id', userId)
            .order(sortBy, { ascending: sortOrder === 'asc' })
            .range(offset, offset + limit - 1);
        if (status) {
            query = query.eq('status', status);
        }
        const { data: bookings, error, count } = await query;
        if (error) {
            throw new common_1.BadRequestException(`Lỗi khi lấy lịch sử đặt vé: ${error.message}`);
        }
        const formattedBookings = bookings?.map(booking => {
            const totalPassengers = booking.booking_segments?.reduce((total, segment) => {
                return total + (segment.passengers?.length || 0);
            }, 0) || 0;
            const totalSegments = booking.booking_segments?.length || 0;
            const totalAmount = booking.payments?.[0]?.amount || 0;
            const firstSegment = booking.booking_segments?.[0];
            const lastSegment = booking.booking_segments?.[booking.booking_segments.length - 1];
            return {
                id: booking.id,
                pnr_code: booking.pnr_code,
                status: booking.status,
                summary: {
                    total_passengers: totalPassengers,
                    total_segments: totalSegments,
                    total_amount: totalAmount,
                    is_roundtrip: totalSegments > 1,
                    departure_airport: firstSegment?.flight_instance?.flight_number?.departure_airport?.iata_code,
                    arrival_airport: lastSegment?.flight_instance?.flight_number?.arrival_airport?.iata_code,
                    departure_date: firstSegment?.flight_instance?.scheduled_departure_local,
                    airline: firstSegment?.flight_instance?.flight_number?.airline?.name
                },
                payment_status: booking.payments?.[0]?.status || 'PENDING',
                created_at: booking.created_at,
                updated_at: booking.updated_at
            };
        }) || [];
        return {
            bookings: formattedBookings,
            pagination: {
                total: count || 0,
                limit,
                offset,
                has_more: (count || 0) > offset + limit
            }
        };
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService,
        airline_statistic_service_1.AirlineStatisticService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map