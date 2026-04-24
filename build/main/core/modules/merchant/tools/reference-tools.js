import { BaseTool } from '../../base.tool.js';
class MerchantReferenceTool extends BaseTool {
    constructor(client) { super(client); }
    getParams() { return {}; }
    async handle(_params) {
        try {
            const response = await this.dataForSEOClient.makeRequest(this.endpoint(), 'GET');
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
export class MerchantAmazonLocationsTool extends MerchantReferenceTool {
    getName() { return 'merchant_amazon_locations'; }
    getDescription() { return 'List of locations supported by the Amazon Merchant API. Returns location codes for targeting.'; }
    endpoint() { return '/v3/merchant/amazon/locations'; }
}
export class MerchantAmazonLanguagesTool extends MerchantReferenceTool {
    getName() { return 'merchant_amazon_languages'; }
    getDescription() { return 'List of languages supported by the Amazon Merchant API.'; }
    endpoint() { return '/v3/merchant/amazon/languages'; }
}
export class MerchantGoogleLocationsTool extends MerchantReferenceTool {
    getName() { return 'merchant_google_locations'; }
    getDescription() { return 'List of locations supported by the Google Shopping Merchant API.'; }
    endpoint() { return '/v3/merchant/google/locations'; }
}
export class MerchantGoogleLanguagesTool extends MerchantReferenceTool {
    getName() { return 'merchant_google_languages'; }
    getDescription() { return 'List of languages supported by the Google Shopping Merchant API.'; }
    endpoint() { return '/v3/merchant/google/languages'; }
}
//# sourceMappingURL=reference-tools.js.map