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
exports.FaresController = void 0;
const common_1 = require("@nestjs/common");
const fares_service_1 = require("../services/fares.service");
const create_fare_dto_1 = require("../dto/create-fare.dto");
const update_fare_dto_1 = require("../dto/update-fare.dto");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const role_enum_1 = require("../../../common/enums/role.enum");
let FaresController = class FaresController {
    faresService;
    constructor(faresService) {
        this.faresService = faresService;
    }
    create(createFareDto) {
        return this.faresService.create(createFareDto);
    }
    findAll() {
        return this.faresService.findAll();
    }
    findOne(id) {
        return this.faresService.findOne(id);
    }
    update(id, updateFareDto) {
        return this.faresService.update(id, updateFareDto);
    }
    remove(id) {
        return this.faresService.remove(id);
    }
    airlineOnly() {
        return { ok: true };
    }
};
exports.FaresController = FaresController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_fare_dto_1.CreateFareDto]),
    __metadata("design:returntype", void 0)
], FaresController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FaresController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FaresController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_fare_dto_1.UpdateFareDto]),
    __metadata("design:returntype", void 0)
], FaresController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FaresController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('airline-only'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.AIRLINE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FaresController.prototype, "airlineOnly", null);
exports.FaresController = FaresController = __decorate([
    (0, common_1.Controller)('fares'),
    __metadata("design:paramtypes", [fares_service_1.FaresService])
], FaresController);
//# sourceMappingURL=fares.controller.js.map