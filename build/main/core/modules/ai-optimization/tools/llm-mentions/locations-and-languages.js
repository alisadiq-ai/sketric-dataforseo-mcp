import { BaseTool } from '../../../base.tool.js';
export class AiOptimizationLlmMentionsLocationsAndLanguagesListTool extends BaseTool {
    constructor(dataForSEOClient) {
        super(dataForSEOClient);
    }
    supportOnlyFullResponse() {
        return true;
    }
    getName() {
        return "ai_opt_llm_ment_loc_and_lang";
    }
    getDescription() {
        return "Utility tool for 'AI Optimization LLM Mentions Locations and Languages' (ai_opt_llm_ment_loc_and_lang) to get list of available locations and languages";
    }
    getParams() {
        return {};
    }
    async handle(params) {
        try {
            const response = await this.dataForSEOClient.makeRequest(`/v3/ai_optimization/llm_mentions/locations_and_languages`, 'GET', null);
            return this.formatResponse(response['items']);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
//# sourceMappingURL=locations-and-languages.js.map