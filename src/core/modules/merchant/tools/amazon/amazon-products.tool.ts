import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';

const SORT_BY = [
  'relevance',
  'price_low_to_high',
  'price_high_to_low',
  'featured',
  'avg_customer_review',
  'newest_arrival',
] as const;

export class MerchantAmazonProductsTaskPostTool extends BaseTool {
  constructor(client: DataForSEOClient) { super(client); }

  getName() { return 'merchant_amazon_products_task_post'; }

  getDescription() {
    return `Initiate an Amazon product search task by keyword. Returns a task id. Most Amazon tasks complete in 10–60 seconds — then call merchant_amazon_products_task_get with the id to retrieve results. Use for product research, competitive pricing, and Amazon SERP analysis.`;
  }

  getParams(): z.ZodRawShape {
    return {
      keyword: z.string().max(700).describe('Amazon product search term (required, max 700 chars)'),
      location_code: z.number().default(2840).optional().describe('numeric location code (default 2840 = United States). See merchant_amazon_locations'),
      location_name: z.string().optional().describe('location name as alternative to location_code (e.g. "United States")'),
      language_code: z.string().default('en_US').optional().describe('language code (default en_US)'),
      depth: z.number().min(1).max(700).default(100).optional().describe('max results (default 100, max 700)'),
      priority: z.number().min(1).max(2).optional().describe('1 = normal, 2 = high speed (extra cost)'),
      sort_by: z.enum(SORT_BY).optional().describe('sort order'),
      price_min: z.number().optional().describe('minimum price filter'),
      price_max: z.number().optional().describe('maximum price filter'),
      department: z.string().optional().describe('Amazon department/category filter'),
      tag: z.string().max(255).optional().describe('user-defined task identifier'),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest('/v3/merchant/amazon/products/task_post', 'POST', [params]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}

export class MerchantAmazonProductsTaskGetTool extends BaseTool {
  constructor(client: DataForSEOClient) { super(client); }

  getName() { return 'merchant_amazon_products_task_get'; }

  getDescription() {
    return `Retrieve results of a previously posted Amazon products task. If the task isn't ready yet (status_code 40602), wait 10–30 seconds and retry.`;
  }

  getParams(): z.ZodRawShape {
    return {
      id: z.string().describe('task id returned by merchant_amazon_products_task_post'),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest(`/v3/merchant/amazon/products/task_get/advanced/${params.id}`, 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
