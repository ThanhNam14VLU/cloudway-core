"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFlightInstanceDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_flight_instance_dto_1 = require("./create-flight-instance.dto");
class UpdateFlightInstanceDto extends (0, mapped_types_1.PartialType)(create_flight_instance_dto_1.CreateFlightInstanceDto) {
}
exports.UpdateFlightInstanceDto = UpdateFlightInstanceDto;
//# sourceMappingURL=update-flight-instance.dto.js.map