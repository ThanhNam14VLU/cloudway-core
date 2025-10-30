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
exports.FlightNumberController = void 0;
const common_1 = require("@nestjs/common");
const flight_number_service_1 = require("../services/flight-number.service");
const create_flight_number_dto_1 = require("../dto/create-flight-number.dto");
const update_flight_number_dto_1 = require("../dto/update-flight-number.dto");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const role_enum_1 = require("../../../common/enums/role.enum");
let FlightNumberController = class FlightNumberController {
    flightNumberService;
    constructor(flightNumberService) {
        this.flightNumberService = flightNumberService;
    }
    create(createFlightDto) {
        return this.flightNumberService.create(createFlightDto);
    }
    findAll() {
        return this.flightNumberService.findAll();
    }
    findOne(id) {
        return this.flightNumberService.findOne(id);
    }
    update(id, updateFlightNumberDto) {
        return this.flightNumberService.update(id, updateFlightNumberDto);
    }
    remove(id) {
        return this.flightNumberService.remove(id);
    }
};
exports.FlightNumberController = FlightNumberController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.AIRLINE),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_flight_number_dto_1.CreateFlightNumberDto]),
    __metadata("design:returntype", void 0)
], FlightNumberController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.AIRLINE, role_enum_1.Role.CUSTOMER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FlightNumberController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.AIRLINE, role_enum_1.Role.CUSTOMER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FlightNumberController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.AIRLINE),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_flight_number_dto_1.UpdateFlightNumberDto]),
    __metadata("design:returntype", void 0)
], FlightNumberController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.AIRLINE),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FlightNumberController.prototype, "remove", null);
exports.FlightNumberController = FlightNumberController = __decorate([
    (0, common_1.Controller)('flight-number'),
    __metadata("design:paramtypes", [flight_number_service_1.FlightNumberService])
], FlightNumberController);
//# sourceMappingURL=flight-number.controller.js.map