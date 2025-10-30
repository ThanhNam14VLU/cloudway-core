"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFlightNumberDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_flight_instance_dto_1 = require("./create-flight-instance.dto");
class UpdateFlightNumberDto extends (0, mapped_types_1.PartialType)(create_flight_instance_dto_1.CreateFlightInstanceDto) {
}
exports.UpdateFlightNumberDto = UpdateFlightNumberDto;
//# sourceMappingURL=update-flight-number.dto.js.map