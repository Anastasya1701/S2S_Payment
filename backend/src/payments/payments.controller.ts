import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('/create')
  async createPurchase(@Body() body: { amount: number; email: string }) {
    return this.paymentsService.createPurchase(body.amount, body.email);
  }

  @Post('/charge')
  async processPayment(@Body() body: { purchaseId: string; cardDetails: any }) {
    return this.paymentsService.processPayment(body.purchaseId, body.cardDetails);
  }
}