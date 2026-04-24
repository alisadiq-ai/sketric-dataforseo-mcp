import { BaseTool } from "../../../base.tool.js";
export class AiOptimizationLlmMentionsFiltersTool extends BaseTool {
    client;
    static cache = {};
    static lastFetchTime = 0;
    static CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    constructor(client) {
        super(client);
        this.client = client;
    }
    getName() {
        return "ai_optimization_llm_mentions_filters";
    }
    getDescription() {
        return "This endpoint provides all the necessary information about filters that can be used with AI Optimization LLM Mentions API endpoints";
    }
    getParams() {
        return {};
    }
    async fetchAndCacheFilters() {
        const now = Date.now();
        // Return cached data if it's still valid
        if (AiOptimizationLlmMentionsFiltersTool.cache &&
            (now - AiOptimizationLlmMentionsFiltersTool.lastFetchTime) < AiOptimizationLlmMentionsFiltersTool.CACHE_TTL) {
            return AiOptimizationLlmMentionsFiltersTool.cache;
        }
        // Fetch fresh data
        const response = await this.client.makeRequest('/v3/ai_optimization/llm_mentions/available_filters', 'GET', null, true);
        this.validateResponseFull(response);
        const result = response.tasks[0].result[0];
        const filters = result['search'];
        // Update cache
        AiOptimizationLlmMentionsFiltersTool.cache = filters;
        AiOptimizationLlmMentionsFiltersTool.lastFetchTime = now;
        return filters;
    }
    async handle(params) {
        try {
            const filters = await this.fetchAndCacheFilters();
            return this.formatResponse(filters);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
//# sourceMappingURL=filters.js.map