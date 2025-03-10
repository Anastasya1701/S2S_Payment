// @ts-nocheck
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

interface PurchaseResponse {
  id: string;
  created_on: number;
  updated_on: number;
  client: {
    email: string;
    phone?: string;
    full_name?: string;
    street_address?: string;
    country?: string;
    city?: string;
    zip_code?: string;
  };
  purchase: {
    currency: string;
    products: {
      name: string;
      quantity: number;
      price: number;
      category?: string;
    }[];
    total: number;
  };
  payment: {
    amount: number;
    currency: string;
    description?: string;
    paid_on?: number;
  };
  status: string;
  checkout_url: string;
  direct_post_url: string;
}
@Injectable()
export class PaymentsService {
  private readonly API_URL: string;
  private readonly BRAND_ID: string;
  private readonly API_KEY: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.API_URL = this.configService.get<string>('API_URL');
    this.BRAND_ID = this.configService.get<string>('BRAND_ID');
    this.API_KEY = this.configService.get<string>('API_KEY');
  }

  async createPurchase(body): Promise<PurchaseResponse> {

    const response = await this.httpService.axiosRef.post(
      'https://gate.libernetix.com/api/v1/purchases/',
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.API_KEY}`,
        },
      },
    );

    return response.data;
  }


  async createDirectPostUrl(body) {

    const defaultData = {
      ...body,
      remember_card: body.remember_card || 'on',
      remote_ip: body.remote_ip || '8.8.8.8',
      user_agent: body.user_agent ||
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
      accept_header: body.accept_header || 'text/html',
      language: 'en-US',
      java_enabled: false,
      javascript_enabled: true,
      color_depth: 24,
      utc_offset: body.utc_offset || 0,
      screen_width: body.screen_width || 1920,
      screen_height: body.screen_height || 1080,
    };

    // try {
      // const response = await this.httpService.axiosRef.post(postUrl, defaultData, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${this.S2S_TOKEN}`,
      //   },
      // });

      const responseData = {"status": "authorized"};

      // Если карта 3D Secure, возвращаем дополнительные параметры
      if (defaultData.card_number === '5555555555554444') {
        return {
          status: '3DS_required',
          Method: 'POST',
          PaReq: 'some_encrypted_data',
          MD: '',
          URL: 'http://url.of.acs.bank/',
          callback_url: 'https://your-callback-url.com',
        };
      }

      // Возвращаем стандартный статус, если карта не 3D Secure
      return responseData;
    // } catch (error) {
    //   throw new HttpException(
    //     {
    //       message: 'Payment processing failed',
    //       error: error.response?.data || error.message,
    //     },
    //     error.response?.status || HttpStatus.BAD_REQUEST,
    //   );
    // }
  }
}