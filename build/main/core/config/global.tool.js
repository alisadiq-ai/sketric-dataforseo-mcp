import { z } from 'zod';
export const GlobalToolConfigSchema = z.object({
    simpleFilter: z.boolean().default(false),
    fullResponse: z.boolean().default(false),
    debug: z.boolean().default(false)
});
// Parse config from environment variables
export function parseGlobalToolConfig() {
    const fullResponseEnv = process.env.DATAFORSEO_FULL_RESPONSE;
    const debugEnv = process.env.DEBUG;
    const simpleFilterEnv = process.env.DATAFORSEO_SIMPLE_FILTER;
    const config = {
        fullResponse: fullResponseEnv === 'true',
        debug: debugEnv === 'true',
        simpleFilter: simpleFilterEnv === 'true'
    };
    return GlobalToolConfigSchema.parse(config);
}
// Export default config
export const defaultGlobalToolConfig = parseGlobalToolConfig();
//# sourceMappingURL=global.tool.js.map