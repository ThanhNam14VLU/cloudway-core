"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAirlineStatisticDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_airline_statistic_dto_1 = require("./create-airline-statistic.dto");
class UpdateAirlineStatisticDto extends (0, mapped_types_1.PartialType)(create_airline_statistic_dto_1.CreateAirlineStatisticDto) {
}
exports.UpdateAirlineStatisticDto = UpdateAirlineStatisticDto;
//# sourceMappingURL=update-airline-statistic.dto.js.map