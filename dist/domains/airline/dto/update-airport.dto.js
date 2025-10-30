"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAirportDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_airport_dto_1 = require("./create-airport.dto");
class UpdateAirportDto extends (0, mapped_types_1.PartialType)(create_airport_dto_1.CreateAirportDto) {
}
exports.UpdateAirportDto = UpdateAirportDto;
//# sourceMappingURL=update-airport.dto.js.map