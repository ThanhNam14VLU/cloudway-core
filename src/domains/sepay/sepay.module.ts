import { Module } from '@nestjs/common';
import { SepayService } from './sepay.service';
import { SepayController } from './sepay.controller';
import { SupabaseService } from '../../services/supabase/supabase.service';

@Module({
  controllers: [SepayController],
  providers: [SepayService, SupabaseService],
})
export class SepayModule {}
