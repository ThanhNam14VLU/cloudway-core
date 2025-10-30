"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAircraftDto = void 0;
const create_aircraft_dto_1 = require("./create-aircraft.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
class UpdateAircraftDto extends (0, mapped_types_1.PartialType)(create_aircraft_dto_1.CreateAircraftDto) {
}
exports.UpdateAircraftDto = UpdateAircraftDto;
//# sourceMappingURL=update-aircraft.dto.js.map