import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}