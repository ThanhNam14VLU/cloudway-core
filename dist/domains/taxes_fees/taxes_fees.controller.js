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
exports.TaxesFeesController = void 0;
const common_1 = require("@nestjs/common");
const taxes_fees_service_1 = require("./taxes_fees.service");
const create_taxes_fee_dto_1 = require("./dto/create-taxes_fee.dto");
const update_taxes_fee_dto_1 = require("./dto/update-taxes_fee.dto");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const role_enum_1 = require("../../common/enums/role.enum");
let TaxesFeesController = class TaxesFeesController {
    taxesFeesService;
    constructor(taxesFeesService) {
        this.taxesFeesService = taxesFeesService;
    }
    create(createTaxesFeeDto) {
        return this.taxesFeesService.create(createTaxesFeeDto);
    }
    findAll() {
        return this.taxesFeesService.findAll();
    }
    findOne(id) {
        return this.taxesFeesService.findOne(id);
    }
    update(id, updateTaxesFeeDto) {
        return this.taxesFeesService.update(id, updateTaxesFeeDto);
    }
    remove(id) {
        return this.taxesFeesService.remove(id);
    }
};
exports.TaxesFeesController = TaxesFeesController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.AIRLINE),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_taxes_fee_dto_1.CreateTaxesFeeDto]),
    __metadata("design:returntype", void 0)
], TaxesFeesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.AIRLINE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TaxesFeesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.AIRLINE),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TaxesFeesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.AIRLINE),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_taxes_fee_dto_1.UpdateTaxesFeeDto]),
    __metadata("design:returntype", void 0)
], TaxesFeesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.AIRLINE),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TaxesFeesController.prototype, "remove", null);
exports.TaxesFeesController = TaxesFeesController = __decorate([
    (0, common_1.Controller)('taxes-fees'),
    __metadata("design:paramtypes", [taxes_fees_service_1.TaxesFeesService])
], TaxesFeesController);
//# sourceMappingURL=taxes_fees.controller.js.map