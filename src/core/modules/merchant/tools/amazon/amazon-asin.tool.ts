import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';

export class MerchantAmazonAsinTaskPostTool extends BaseTool {
  constructor(client: DataForSEOClient) { super(client); }
  getName() { return 'merchant_amazon_asin_task_post'; }
  getDescription() {
    return `Initiate a detailed Amazon product fetch by ASIN. Returns a task id — then call merchant_amazon_asin_task_get with the id. Returns title, price, rating, description, images, bullets, variants.`;
  }

  getParams(): z.ZodRawShape {
    return {
      asin: z.string().describe('Amazon Standard Identification Number (required)'),
      location_code: z.number().default(2840).optional().describe('numeric location code (default 2840 = US)'),
      language_code: z.string().default('en_US').optional().describe('language code (default en_US)'),
      priority: z.number().min(1).max(2).optional().describe('1 = normal, 2 = high speed'),
      tag: z.string().max(255).optional().describe('user-defined task identifier'),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest('/v3/merchant/amazon/asin/task_post', 'POST', [params]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}

export class MerchantAmazonAsinTaskGetTool extends BaseTool {
  constructor(client: DataForSEOClient) { super(client); }
  getName() { return 'merchant_amazon_asin_task_get'; }
  getDescription() { return `Retrieve results of a previously posted Amazon ASIN task. Poll every 10–30s if not ready.`; }

  getParams(): z.ZodRawShape {
    return { id: z.string().describe('task id from merchant_amazon_asin_task_post') };
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest(`/v3/merchant/amazon/asin/task_get/advanced/${params.id}`, 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
