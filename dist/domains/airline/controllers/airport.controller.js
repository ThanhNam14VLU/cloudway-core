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
exports.AirportController = void 0;
const common_1 = require("@nestjs/common");
const airport_service_1 = require("../services/airport.service");
const create_airport_dto_1 = require("../dto/create-airport.dto");
const update_airport_dto_1 = require("../dto/update-airport.dto");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const role_enum_1 = require("../../../common/enums/role.enum");
let AirportController = class AirportController {
    airportService;
    constructor(airportService) {
        this.airportService = airportService;
    }
    findAll() {
        return this.airportService.findAll();
    }
    findOne(id) {
        return this.airportService.findOne(id);
    }
    create(createAirporDto) {
        return this.airportService.create(createAirporDto);
    }
    update(id, updateAirportDto) {
        return this.airportService.update(id, updateAirportDto);
    }
    remove(id) {
        return this.airportService.remove(id);
    }
};
exports.AirportController = AirportController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.AIRLINE, role_enum_1.Role.CUSTOMER, role_enum_1.Role.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AirportController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.AIRLINE),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AirportController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_airport_dto_1.CreateAirportDto]),
    __metadata("design:returntype", void 0)
], AirportController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.AIRLINE),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_airport_dto_1.UpdateAirportDto]),
    __metadata("design:returntype", void 0)
], AirportController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AirportController.prototype, "remove", null);
exports.AirportController = AirportController = __decorate([
    (0, common_1.Controller)('airport'),
    __metadata("design:paramtypes", [airport_service_1.AirportService])
], AirportController);
//# sourceMappingURL=airport.controller.js.map