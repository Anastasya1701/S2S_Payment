// @ts-nocheck
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentsService {
  private readonly API_URL: string;
  private readonly BRAND_ID: string;
  private readonly API_KEY: string;
  private readonly S2S_TOKEN: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.API_URL = this.configService.get<string>('API_URL');
    this.BRAND_ID = this.configService.get<string>('BRAND_ID');
    this.API_KEY = this.configService.get<string>('API_KEY');
    this.S2S_TOKEN = this.configService.get<string>('S2S_TOKEN');
  }

  async createPurchase(amount: number, email: string) {
    const payload = {
      client: { email },
      purchase: { products: [{ name: 'test', price: amount }] },
      brand_id: this.BRAND_ID,
    };

    const response = await this.httpService.axiosRef.post(`${this.API_URL}/purchases/`, payload, {
      headers: { Authorization: `Bearer ${this.API_KEY}` },
    });

    return response.data;
  }

  async processPayment(purchaseId: string, cardDetails: any) {
    const url = `${this.API_URL}/purchases/${purchaseId}/charge/`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.S2S_TOKEN}`,
    };

    const response = await this.httpService.axiosRef.post(url, cardDetails, { headers });
    return response.data;
  }
}