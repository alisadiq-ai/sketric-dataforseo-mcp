import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
export class AppDataGoogleAppListingsSearchTool extends BaseTool {
    constructor(client) {
        super(client);
    }
    getName() {
        return 'app_data_google_app_listings_search';
    }
    getDescription() {
        return `Search apps on the Google Play Store by keyword in title/description, category, and metadata. Returns app title, developer, rating, install count, pricing, and more. Use for Google Play ASO (App Store Optimization) research.`;
    }
    getParams() {
        return {
            title: z.string().max(200).optional().describe('keywords appearing in app title (max 200 chars)'),
            description: z.string().max(200).optional().describe('keywords appearing in app description (max 200 chars)'),
            categories: z.array(z.string()).max(10).optional().describe('Google Play category codes to filter by (max 10). Get codes via app_data_google_categories'),
            limit: z.number().min(1).max(1000).default(100).optional().describe('max apps returned (default 100)'),
            offset: z.number().min(0).optional().describe('offset in the results array (default 0)'),
            filters: this.getFilterExpression().optional().describe('array of filter expressions (max 8). Example: ["rating.value",">",4]. Use filters instead of sorting — this endpoint does not accept order_by.'),
        };
    }
    async handle(params) {
        try {
            const response = await this.dataForSEOClient.makeRequest('/v3/app_data/google/app_listings/search/live', 'POST', [{
                    title: params.title,
                    description: params.description,
                    categories: params.categories,
                    limit: params.limit,
                    offset: params.offset,
                    filters: this.formatFilters(params.filters),
                }]);
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
//# sourceMappingURL=google-app-listings-search.tool.js.map