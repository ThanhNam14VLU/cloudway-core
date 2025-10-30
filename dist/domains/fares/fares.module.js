"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaresModule = void 0;
const common_1 = require("@nestjs/common");
const fares_service_1 = require("./services/fares.service");
const fares_controller_1 = require("./controllers/fares.controller");
const fare_bucket_service_1 = require("./services/fare-bucket.service");
const fare_bucket_controller_1 = require("./controllers/fare-bucket.controller");
const supabase_service_1 = require("../../services/supabase/supabase.service");
let FaresModule = class FaresModule {
};
exports.FaresModule = FaresModule;
exports.FaresModule = FaresModule = __decorate([
    (0, common_1.Module)({
        controllers: [fares_controller_1.FaresController, fare_bucket_controller_1.FareBucketController],
        providers: [fares_service_1.FaresService, fare_bucket_service_1.FareBucketService, supabase_service_1.SupabaseService],
    })
], FaresModule);
//# sourceMappingURL=fares.module.js.map