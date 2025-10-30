"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const configuration_1 = __importDefault(require("./configs/configuration"));
const user_module_1 = require("./domains/user/user.module");
const auth_middleware_1 = require("./middleware/auth/auth.middleware");
const airline_module_1 = require("./domains/airline/airline.module");
const auth_module_1 = require("./domains/auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const config_2 = require("@nestjs/config");
const flights_module_1 = require("./domains/flights/flights.module");
const fares_module_1 = require("./domains/fares/fares.module");
const bookings_module_1 = require("./domains/bookings/bookings.module");
const booking_segments_module_1 = require("./domains/booking-segments/booking-segments.module");
const payments_module_1 = require("./domains/payments/payments.module");
const taxes_fees_module_1 = require("./domains/taxes_fees/taxes_fees.module");
const tickets_module_1 = require("./domains/tickets/tickets.module");
const supabase_service_1 = require("./services/supabase/supabase.service");
const airline_statistic_module_1 = require("./domains/airline-statistic/airline-statistic.module");
const sepay_module_1 = require("./domains/sepay/sepay.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .exclude('payment/sepay/webhook')
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
                load: [configuration_1.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule.forRoot({ isGlobal: true, })],
                useFactory: (configService) => {
                    return {
                        type: 'postgres',
                        host: configService.get('DB_HOST'),
                        port: parseInt(configService.get('DB_PORT') || '6543', 10),
                        username: configService.get('DB_USER'),
                        password: configService.get('DB_PASSWORD'),
                        database: configService.get('DB_NAME'),
                        entities: [__dirname + '/**/*.entity{.ts,.js}'],
                        synchronize: false,
                    };
                },
                inject: [config_2.ConfigService],
            }),
            user_module_1.UserModule,
            airline_module_1.AirlineModule,
            auth_module_1.AuthModule,
            flights_module_1.FlightsModule,
            fares_module_1.FaresModule,
            bookings_module_1.BookingsModule,
            booking_segments_module_1.BookingSegmentsModule,
            payments_module_1.PaymentsModule,
            taxes_fees_module_1.TaxesFeesModule,
            tickets_module_1.TicketsModule,
            airline_statistic_module_1.AirlineStatisticModule,
            sepay_module_1.SepayModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, supabase_service_1.SupabaseService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map