"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingSegmentsController = void 0;
const common_1 = require("@nestjs/common");
const booking_segments_service_1 = require("./booking-segments.service");
const create_booking_segment_dto_1 = require("./dto/create-booking-segment.dto");
const update_booking_segment_dto_1 = require("./dto/update-booking-segment.dto");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const role_enum_1 = require("../../common/enums/role.enum");
let BookingSegmentsController = class BookingSegmentsController {
    bookingSegmentsService;
    constructor(bookingSegmentsService) {
        this.bookingSegmentsService = bookingSegmentsService;
    }
    create(createBookingSegmentDto) {
        return this.bookingSegmentsService.create(createBookingSegmentDto);
    }
    findAll() {
        return this.bookingSegmentsService.findAll();
    }
    findOne(id) {
        return this.bookingSegmentsService.findOne(id);
    }
    update(id, updateBookingSegmentDto) {
        return this.bookingSegmentsService.update(id, updateBookingSegmentDto);
    }
    remove(id) {
        return this.bookingSegmentsService.remove(id);
    }
};
exports.BookingSegmentsController = BookingSegmentsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.CUSTOMER),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_booking_segment_dto_1.CreateBookingSegmentDto]),
    __metadata("design:returntype", void 0)
], BookingSegmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.AIRLINE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookingSegmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.AIRLINE, role_enum_1.Role.CUSTOMER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookingSegmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.AIRLINE, role_enum_1.Role.CUSTOMER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_booking_segment_dto_1.UpdateBookingSegmentDto]),
    __metadata("design:returntype", void 0)
], BookingSegmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.AIRLINE),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookingSegmentsController.prototype, "remove", null);
exports.BookingSegmentsController = BookingSegmentsController = __decorate([
    (0, common_1.Controller)('booking-segments'),
    __metadata("design:paramtypes", [booking_segments_service_1.BookingSegmentsService])
], BookingSegmentsController);
//# sourceMappingURL=booking-segments.controller.js.map