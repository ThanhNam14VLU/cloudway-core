"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingSegmentsModule = void 0;
const common_1 = require("@nestjs/common");
const booking_segments_service_1 = require("./booking-segments.service");
const booking_segments_controller_1 = require("./booking-segments.controller");
const supabase_service_1 = require("../../services/supabase/supabase.service");
let BookingSegmentsModule = class BookingSegmentsModule {
};
exports.BookingSegmentsModule = BookingSegmentsModule;
exports.BookingSegmentsModule = BookingSegmentsModule = __decorate([
    (0, common_1.Module)({
        controllers: [booking_segments_controller_1.BookingSegmentsController],
        providers: [booking_segments_service_1.BookingSegmentsService, supabase_service_1.SupabaseService],
    })
], BookingSegmentsModule);
//# sourceMappingURL=booking-segments.module.js.map