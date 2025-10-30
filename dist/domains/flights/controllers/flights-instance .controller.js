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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightsInstanceController = void 0;
const common_1 = require("@nestjs/common");
const flights_instance_service_1 = require("../services/./flights-instance.service");
const create_flight_instance_dto_1 = require("../dto/create-flight-instance.dto");
const update_flight_instance_dto_1 = require("../dto/update-flight-instance.dto");
const update_flight_schedule_dto_1 = require("../dto/update-flight-schedule.dto");
const update_flight_status_dto_1 = require("../dto/update-flight-status.dto");
const search_flights_dto_1 = require("../dto/search-flights.dto");
const filter_flights_by_status_dto_1 = require("../dto/filter-flights-by-status.dto");
const role_enum_1 = require("../../../common/enums/role.enum");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
let FlightsInstanceController = class FlightsInstanceController {
    flightsInstanceService;
    constructor(flightsInstanceService) {
        this.flightsInstanceService = flightsInstanceService;
    }
    async searchFlights(searchDto) {
        return this.flightsInstanceService.searchFlights(searchDto);
    }
    async createFlight(dto) {
        return this.flightsInstanceService.createFlight(dto);
    }
    findAll() {
        return this.flightsInstanceService.findAll();
    }
    findOne(id) {
        return this.flightsInstanceService.findOne(id);
    }
    findByAirline(airlineId) {
        return this.flightsInstanceService.findByAirline(airlineId);
    }
    filterByStatus(filterDto) {
        return this.flightsInstanceService.filterByStatus(filterDto);
    }
    update(id, updateFlightInstanceDto) {
        return this.flightsInstanceService.update(id, updateFlightInstanceDto);
    }
    updateSchedule(id, updateScheduleDto) {
        return this.flightsInstanceService.updateSchedule(id, updateScheduleDto);
    }
    updateStatus(id, updateStatusDto) {
        return this.flightsInstanceService.updateStatus(id, updateStatusDto);
    }
    remove(id) {
        return this.flightsInstanceService.remove(id);
    }
    cancelFlight(id) {
        return this.flightsInstanceService.cancelFlight(id);
    }
    airlineOnly() {
        return { ok: true };
    }
};
exports.FlightsInstanceController = FlightsInstanceController;
__decorate([
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_flights_dto_1.SearchFlightsDto]),
    __metadata("design:returntype", Promise)
], FlightsInstanceController.prototype, "searchFlights", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_flight_instance_dto_1.CreateFlightInstanceDto]),
    __metadata("design:returntype", Promise)
], FlightsInstanceController.prototype, "createFlight", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FlightsInstanceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FlightsInstanceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('airline/:airlineId'),
    __param(0, (0, common_1.Param)('airlineId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FlightsInstanceController.prototype, "findByAirline", null);
__decorate([
    (0, common_1.Get)('filter/status'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_flights_by_status_dto_1.FilterFlightsByStatusDto]),
    __metadata("design:returntype", void 0)
], FlightsInstanceController.prototype, "filterByStatus", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_flight_instance_dto_1.UpdateFlightInstanceDto]),
    __metadata("design:returntype", void 0)
], FlightsInstanceController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/schedule'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_flight_schedule_dto_1.UpdateFlightScheduleDto]),
    __metadata("design:returntype", void 0)
], FlightsInstanceController.prototype, "updateSchedule", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_flight_status_dto_1.UpdateFlightStatusDto]),
    __metadata("design:returntype", void 0)
], FlightsInstanceController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FlightsInstanceController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/cancel'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FlightsInstanceController.prototype, "cancelFlight", null);
__decorate([
    (0, common_1.Get)('airline-only'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.AIRLINE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FlightsInstanceController.prototype, "airlineOnly", null);
exports.FlightsInstanceController = FlightsInstanceController = __decorate([
    (0, common_1.Controller)('flights'),
    __metadata("design:paramtypes", [flights_instance_service_1.FlightsInstanceService])
], FlightsInstanceController);
//# sourceMappingURL=flights-instance%20.controller.js.map