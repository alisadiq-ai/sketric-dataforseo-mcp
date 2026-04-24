import { BaseModule } from '../base.module.js';
import { onpagePrompts } from './onpage.prompt.js';
import { ContentParsingTool } from './tools/content-parsing.tool.js';
import { InstantPagesTool } from './tools/instant-pages.tool.js';
import { LighthouseTool } from './tools/lighthouse.tool.js';
export class OnPageApiModule extends BaseModule {
    getTools() {
        const tools = [
            new ContentParsingTool(this.dataForSEOClient),
            new InstantPagesTool(this.dataForSEOClient),
            new LighthouseTool(this.dataForSEOClient),
            // Add more tools here
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
        return onpagePrompts.reduce((acc, prompt) => ({
            ...acc,
            [prompt.name]: {
                description: prompt.description,
                params: prompt.params,
                handler: (params) => {
                    return prompt.handler(params);
                },
            },
        }), {});
    }
}
//# sourceMappingURL=onpage-api.module.js.map