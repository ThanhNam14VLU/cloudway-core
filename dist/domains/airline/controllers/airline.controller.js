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
exports.AirlineController = void 0;
const common_1 = require("@nestjs/common");
const airline_service_1 = require("../services/airline.service");
const create_airline_dto_1 = require("../dto/create-airline.dto");
const update_airline_dto_1 = require("../dto/update-airline.dto");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const role_enum_1 = require("../../../common/enums/role.enum");
let AirlineController = class AirlineController {
    airlineService;
    constructor(airlineService) {
        this.airlineService = airlineService;
    }
    create(createAirlineDto) {
        return this.airlineService.create(createAirlineDto);
    }
    findAll() {
        return this.airlineService.findAll();
    }
    findOne(id) {
        return this.airlineService.findOne(id);
    }
    update(id, updateAirlineDto) {
        return this.airlineService.update(id, updateAirlineDto);
    }
    remove(id) {
        return this.airlineService.remove(id);
    }
};
exports.AirlineController = AirlineController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_airline_dto_1.CreateAirlineDto]),
    __metadata("design:returntype", void 0)
], AirlineController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AirlineController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.AIRLINE),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AirlineController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.AIRLINE),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_airline_dto_1.UpdateAirlineDto]),
    __metadata("design:returntype", void 0)
], AirlineController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AirlineController.prototype, "remove", null);
exports.AirlineController = AirlineController = __decorate([
    (0, common_1.Controller)('airline'),
    __metadata("design:paramtypes", [airline_service_1.AirlineService])
], AirlineController);
//# sourceMappingURL=airline.controller.js.map