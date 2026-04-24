import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { DataForSEOClient } from "../core/client/dataforseo.client.js";
import { EnabledModulesSchema } from "../core/config/modules.config.js";
import { ModuleLoaderService } from "../core/utils/module-loader.js";
import { z } from 'zod';
import { name, version } from '../core/utils/version.js';
export function initMcpServer(username, password) {
    const server = new McpServer({
        name,
        version,
    }, { capabilities: { logging: {} } });
    // Initialize DataForSEO client
    const dataForSEOConfig = {
        username: username || "",
        password: password || "",
    };
    const dataForSEOClient = new DataForSEOClient(dataForSEOConfig);
    console.error('DataForSEO client initialized');
    // Parse enabled modules from environment
    const enabledModules = EnabledModulesSchema.parse(process.env.ENABLED_MODULES);
    // Initialize modules
    const modules = ModuleLoaderService.loadModules(dataForSEOClient, enabledModules);
    const enabledPrompts = process.env.ENABLED_PROMPTS?.split(',').map(name => name.trim()) || [];
    // Register modules
    modules.forEach(module => {
        const tools = module.getTools();
        Object.entries(tools).forEach(([name, tool]) => {
            const typedTool = tool;
            const schema = z.object(typedTool.params);
            server.tool(name, typedTool.description, schema.shape, typedTool.handler);
        });
        const prompts = module.getPrompts();
        // Filter prompts based on enabledPrompts configuration
        const allowedPrompts = enabledPrompts.length === 0
            ? prompts
            : Object.fromEntries(Object.entries(prompts).filter(([promptName]) => enabledPrompts.includes(promptName)));
        Object.entries(allowedPrompts).forEach(([name, prompt]) => {
            server.registerPrompt(name, {
                description: prompt.description,
                argsSchema: prompt.params,
            }, prompt.handler);
        });
    });
    return server;
}
//# sourceMappingURL=init-mcp-server.js.map