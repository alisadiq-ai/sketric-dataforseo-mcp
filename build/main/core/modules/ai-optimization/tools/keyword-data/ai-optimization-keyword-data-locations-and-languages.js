import { BaseTool } from '../../../base.tool.js';
export class AiOptimizationKeywordDataLocationsAndLanguagesListTool extends BaseTool {
    constructor(dataForSEOClient) {
        super(dataForSEOClient);
    }
    supportOnlyFullResponse() {
        return true;
    }
    getName() {
        return "ai_opt_kw_data_loc_and_lang";
    }
    getDescription() {
        return "Utility tool for 'AI Optimization Keyword Data Locations and Languages' (ai_opt_kw_data_loc_and_lang) to get list of availible locations and languages";
    }
    getParams() {
        return {};
    }
    async handle(params) {
        try {
            const response = await this.dataForSEOClient.makeRequest(`/v3/ai_optimization/ai_keyword_data/locations_and_languages`, 'GET', null);
            return this.formatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
//# sourceMappingURL=ai-optimization-keyword-data-locations-and-languages.js.map