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
exports.CreateBookingWithPassengersDto = exports.BookingSegmentDto = exports.PassengerInfoDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class PassengerInfoDto {
    full_name;
    date_of_birth;
    id_number;
    phone;
    email;
    passenger_type;
}
exports.PassengerInfoDto = PassengerInfoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PassengerInfoDto.prototype, "full_name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], PassengerInfoDto.prototype, "date_of_birth", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PassengerInfoDto.prototype, "id_number", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PassengerInfoDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], PassengerInfoDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['ADULT', 'CHILD', 'INFANT']),
    __metadata("design:type", String)
], PassengerInfoDto.prototype, "passenger_type", void 0);
class BookingSegmentDto {
    flight_instance_id;
    fare_bucket_id;
    passengers;
}
exports.BookingSegmentDto = BookingSegmentDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], BookingSegmentDto.prototype, "flight_instance_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], BookingSegmentDto.prototype, "fare_bucket_id", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PassengerInfoDto),
    __metadata("design:type", Array)
], BookingSegmentDto.prototype, "passengers", void 0);
class CreateBookingWithPassengersDto {
    user_id;
    contact_fullname;
    contact_phone;
    segments;
}
exports.CreateBookingWithPassengersDto = CreateBookingWithPassengersDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateBookingWithPassengersDto.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookingWithPassengersDto.prototype, "contact_fullname", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookingWithPassengersDto.prototype, "contact_phone", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BookingSegmentDto),
    __metadata("design:type", Array)
], CreateBookingWithPassengersDto.prototype, "segments", void 0);
//# sourceMappingURL=create-booking-with-passengers.dto.js.map