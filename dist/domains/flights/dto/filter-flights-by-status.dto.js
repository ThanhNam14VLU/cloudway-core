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
exports.FilterFlightsByStatusDto = void 0;
const class_validator_1 = require("class-validator");
const flight_status_enum_1 = require("../../../common/enums/flight-status.enum");
class FilterFlightsByStatusDto {
    status;
}
exports.FilterFlightsByStatusDto = FilterFlightsByStatusDto;
__decorate([
    (0, class_validator_1.IsEnum)(flight_status_enum_1.FlightStatus, { message: 'Status phải là một trong các giá trị: SCHEDULED, DEPARTED, ARRIVED, CANCELLED' }),
    __metadata("design:type", String)
], FilterFlightsByStatusDto.prototype, "status", void 0);
//# sourceMappingURL=filter-flights-by-status.dto.js.map