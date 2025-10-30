"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirlineStatisticModule = void 0;
const common_1 = require("@nestjs/common");
const airline_statistic_service_1 = require("./airline-statistic.service");
const airline_statistic_controller_1 = require("./airline-statistic.controller");
const supabase_service_1 = require("../../services/supabase/supabase.service");
let AirlineStatisticModule = class AirlineStatisticModule {
};
exports.AirlineStatisticModule = AirlineStatisticModule;
exports.AirlineStatisticModule = AirlineStatisticModule = __decorate([
    (0, common_1.Module)({
        controllers: [airline_statistic_controller_1.AirlineStatisticController],
        providers: [airline_statistic_service_1.AirlineStatisticService, supabase_service_1.SupabaseService],
        exports: [airline_statistic_service_1.AirlineStatisticService],
    })
], AirlineStatisticModule);
//# sourceMappingURL=airline-statistic.module.js.map