"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaxesFeeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_taxes_fee_dto_1 = require("./create-taxes_fee.dto");
class UpdateTaxesFeeDto extends (0, mapped_types_1.PartialType)(create_taxes_fee_dto_1.CreateTaxesFeeDto) {
}
exports.UpdateTaxesFeeDto = UpdateTaxesFeeDto;
//# sourceMappingURL=update-taxes_fee.dto.js.map