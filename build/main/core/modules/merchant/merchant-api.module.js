import { BaseModule } from '../base.module.js';
import { MerchantAmazonProductsTaskPostTool, MerchantAmazonProductsTaskGetTool, } from './tools/amazon/amazon-products.tool.js';
import { MerchantAmazonAsinTaskPostTool, MerchantAmazonAsinTaskGetTool, } from './tools/amazon/amazon-asin.tool.js';
import { MerchantGoogleProductsTaskPostTool, MerchantGoogleProductsTaskGetTool, } from './tools/google/google-products.tool.js';
import { MerchantAmazonLocationsTool, MerchantAmazonLanguagesTool, MerchantGoogleLocationsTool, MerchantGoogleLanguagesTool, } from './tools/reference-tools.js';
export class MerchantApiModule extends BaseModule {
    getTools() {
        const tools = [
            new MerchantAmazonProductsTaskPostTool(this.dataForSEOClient),
            new MerchantAmazonProductsTaskGetTool(this.dataForSEOClient),
            new MerchantAmazonAsinTaskPostTool(this.dataForSEOClient),
            new MerchantAmazonAsinTaskGetTool(this.dataForSEOClient),
            new MerchantGoogleProductsTaskPostTool(this.dataForSEOClient),
            new MerchantGoogleProductsTaskGetTool(this.dataForSEOClient),
            new MerchantAmazonLocationsTool(this.dataForSEOClient),
            new MerchantAmazonLanguagesTool(this.dataForSEOClient),
            new MerchantGoogleLocationsTool(this.dataForSEOClient),
            new MerchantGoogleLanguagesTool(this.dataForSEOClient),
        ];
        return tools.reduce((acc, tool) => ({
            ...acc,
            [tool.getName()]: {
                description: tool.getDescription(),
                params: tool.getParams(),
                handler: (params) => tool.handle(params),
            },
        }), {});
    }
    getPrompts() {
        return {};
    }
}
//# sourceMappingURL=merchant-api.module.js.map