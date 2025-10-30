"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFareBucketDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_fare_bucket_dto_1 = require("./create-fare-bucket.dto");
class UpdateFareBucketDto extends (0, mapped_types_1.PartialType)(create_fare_bucket_dto_1.CreateFareBucketDto) {
}
exports.UpdateFareBucketDto = UpdateFareBucketDto;
//# sourceMappingURL=update-fare-bucket.dto.js.map