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
exports.AirlineStatisticController = void 0;
const common_1 = require("@nestjs/common");
const airline_statistic_service_1 = require("./airline-statistic.service");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const role_enum_1 = require("../../common/enums/role.enum");
let AirlineStatisticController = class AirlineStatisticController {
    airlineStatisticService;
    constructor(airlineStatisticService) {
        this.airlineStatisticService = airlineStatisticService;
    }
    getAirlineStatistics(airlineId) {
        return this.airlineStatisticService.getAirlineStatistics(airlineId);
    }
};
exports.AirlineStatisticController = AirlineStatisticController;
__decorate([
    (0, common_1.Get)(':airlineId'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.AIRLINE),
    __param(0, (0, common_1.Param)('airlineId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AirlineStatisticController.prototype, "getAirlineStatistics", null);
exports.AirlineStatisticController = AirlineStatisticController = __decorate([
    (0, common_1.Controller)('airline-statistics'),
    __metadata("design:paramtypes", [airline_statistic_service_1.AirlineStatisticService])
], AirlineStatisticController);
//# sourceMappingURL=airline-statistic.controller.js.map