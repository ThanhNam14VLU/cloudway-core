"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAirlineDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_airline_dto_1 = require("./create-airline.dto");
class UpdateAirlineDto extends (0, mapped_types_1.PartialType)(create_airline_dto_1.CreateAirlineDto) {
}
exports.UpdateAirlineDto = UpdateAirlineDto;
//# sourceMappingURL=update-airline.dto.js.map