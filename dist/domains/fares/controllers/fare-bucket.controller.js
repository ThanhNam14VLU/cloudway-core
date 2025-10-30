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
exports.FareBucketController = void 0;
const common_1 = require("@nestjs/common");
const create_fare_bucket_dto_1 = require("../dto/create-fare-bucket.dto");
const update_fare_bucket_dto_1 = require("../dto/update-fare-bucket.dto");
const fare_bucket_service_1 = require("../services/fare-bucket.service");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const role_enum_1 = require("../../../common/enums/role.enum");
let FareBucketController = class FareBucketController {
    fareBucketService;
    constructor(fareBucketService) {
        this.fareBucketService = fareBucketService;
    }
    create(createFareBucketDto) {
        return this.fareBucketService.create(createFareBucketDto);
    }
    findAll() {
        return this.fareBucketService.findAll();
    }
    findOne(id) {
        return this.fareBucketService.findOne(id);
    }
    update(id, updateFareBucketDto) {
        return this.fareBucketService.update(id, updateFareBucketDto);
    }
    remove(id) {
        return this.fareBucketService.remove(id);
    }
    airlineOnly() {
        return { ok: true };
    }
};
exports.FareBucketController = FareBucketController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_fare_bucket_dto_1.CreateFareBucketDto]),
    __metadata("design:returntype", void 0)
], FareBucketController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FareBucketController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FareBucketController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_fare_bucket_dto_1.UpdateFareBucketDto]),
    __metadata("design:returntype", void 0)
], FareBucketController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FareBucketController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('airline-only'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.AIRLINE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FareBucketController.prototype, "airlineOnly", null);
exports.FareBucketController = FareBucketController = __decorate([
    (0, common_1.Controller)('fare-bucket'),
    __metadata("design:paramtypes", [fare_bucket_service_1.FareBucketService])
], FareBucketController);
//# sourceMappingURL=fare-bucket.controller.js.map