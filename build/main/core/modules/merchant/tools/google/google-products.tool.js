import { z } from 'zod';
import { BaseTool } from '../../../base.tool.js';
export class MerchantGoogleProductsTaskPostTool extends BaseTool {
    constructor(client) { super(client); }
    getName() { return 'merchant_google_products_task_post'; }
    getDescription() {
        return `Initiate a Google Shopping product search task by keyword. Returns a task id — then call merchant_google_products_task_get. Use for Google Shopping SERP analysis, price comparisons, and merchant competitor research.`;
    }
    getParams() {
        return {
            keyword: z.string().max(700).describe('Google Shopping search term (required)'),
            location_code: z.number().default(2840).optional().describe('numeric location code (default 2840 = US)'),
            location_name: z.string().optional().describe('location name alternative'),
            language_code: z.string().default('en').optional().describe('language code (default en)'),
            priority: z.number().min(1).max(2).optional().describe('1 = normal, 2 = high speed'),
            price_min: z.number().optional(),
            price_max: z.number().optional(),
            tag: z.string().max(255).optional().describe('user-defined task identifier'),
        };
    }
    async handle(params) {
        try {
            const response = await this.dataForSEOClient.makeRequest('/v3/merchant/google/products/task_post', 'POST', [params]);
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
export class MerchantGoogleProductsTaskGetTool extends BaseTool {
    constructor(client) { super(client); }
    getName() { return 'merchant_google_products_task_get'; }
    getDescription() { return `Retrieve results of a previously posted Google Shopping task. Poll every 10–30s if not ready.`; }
    getParams() {
        return { id: z.string().describe('task id from merchant_google_products_task_post') };
    }
    async handle(params) {
        try {
            const response = await this.dataForSEOClient.makeRequest(`/v3/merchant/google/products/task_get/advanced/${params.id}`, 'GET');
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
//# sourceMappingURL=google-products.tool.js.map