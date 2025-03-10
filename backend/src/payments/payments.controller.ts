import { Controller, Post, Get, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('purchases')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('/')
  getRoot() {
    return { message: 'API is running!' };
  }
  @Post('/create')
  async createPurchase(@Body() body: any) {
    return this.paymentsService.createPurchase(body);
  }

  @Post('/direct_post_url')
  async createDirectPostUrl(@Body() body: any) {
    return this.paymentsService.createDirectPostUrl(body);
  }
}