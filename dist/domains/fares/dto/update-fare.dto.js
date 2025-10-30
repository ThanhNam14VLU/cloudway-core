"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFareDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_fare_dto_1 = require("./create-fare.dto");
class UpdateFareDto extends (0, mapped_types_1.PartialType)(create_fare_dto_1.CreateFareDto) {
}
exports.UpdateFareDto = UpdateFareDto;
//# sourceMappingURL=update-fare.dto.js.map