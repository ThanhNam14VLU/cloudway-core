import { Module } from '@nestjs/common';
import { FaresService } from './fares.service';
import { FaresController } from './fares.controller';

@Module({
  controllers: [FaresController],
  providers: [FaresService],
})
export class FaresModule {}
