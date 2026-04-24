import { z } from 'zod';
import { DataForSEOClient } from '../../../../client/dataforseo.client.js';
import { BaseTool } from '../../../base.tool.js';

export class AppDataAppleAppListingsSearchTool extends BaseTool {
  constructor(client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'app_data_apple_app_listings_search';
  }

  getDescription(): string {
    return `Search apps on the Apple App Store by keyword in title/description, category, and metadata. Returns app title, developer, rating, price, and more. Use for Apple App Store ASO research.`;
  }

  getParams(): z.ZodRawShape {
    return {
      title: z.string().max(200).optional().describe('keywords appearing in app title (max 200 chars)'),
      description: z.string().max(200).optional().describe('keywords appearing in app description (max 200 chars)'),
      categories: z.array(z.string()).max(10).optional().describe('Apple App Store category codes (max 10). Get codes via app_data_apple_categories'),
      limit: z.number().min(1).max(1000).default(100).optional().describe('max apps returned (default 100)'),
      offset: z.number().min(0).optional().describe('offset in results (default 0)'),
      filters: this.getFilterExpression().optional().describe('filter expressions (max 8). Example: ["rating.value",">",4]. Use filters instead of sorting — this endpoint does not accept order_by.'),
    };
  }

  async handle(params: any): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest('/v3/app_data/apple/app_listings/search/live', 'POST', [{
        title: params.title,
        description: params.description,
        categories: params.categories,
        limit: params.limit,
        offset: params.offset,
        filters: this.formatFilters(params.filters),
      }]);
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}
