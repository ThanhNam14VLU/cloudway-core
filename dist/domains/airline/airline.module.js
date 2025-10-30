"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirlineModule = void 0;
const common_1 = require("@nestjs/common");
const airline_service_1 = require("./services/airline.service");
const airline_controller_1 = require("./controllers/airline.controller");
const supabase_service_1 = require("../../services/supabase/supabase.service");
const aircraft_service_1 = require("./services/aircraft.service");
const airport_service_1 = require("./services/airport.service");
const airport_controller_1 = require("./controllers/airport.controller");
const aircraft_controller_1 = require("./controllers/aircraft.controller");
let AirlineModule = class AirlineModule {
};
exports.AirlineModule = AirlineModule;
exports.AirlineModule = AirlineModule = __decorate([
    (0, common_1.Module)({
        controllers: [airline_controller_1.AirlineController, airport_controller_1.AirportController, aircraft_controller_1.AircraftController],
        providers: [airline_service_1.AirlineService, supabase_service_1.SupabaseService, aircraft_service_1.AircraftService, airport_service_1.AirportService],
    })
], AirlineModule);
//# sourceMappingURL=airline.module.js.map