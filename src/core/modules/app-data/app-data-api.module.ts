import { BaseModule, ToolDefinition } from '../base.module.js';
import { PromptDefinition } from '../prompt-definition.js';
import { AppDataGoogleAppListingsSearchTool } from './tools/google/google-app-listings-search.tool.js';
import { AppDataAppleAppListingsSearchTool } from './tools/apple/apple-app-listings-search.tool.js';
import {
  AppDataGoogleCategoriesTool,
  AppDataGoogleLocationsTool,
  AppDataGoogleLanguagesTool,
  AppDataAppleCategoriesTool,
  AppDataAppleLocationsTool,
  AppDataAppleLanguagesTool,
} from './tools/reference-tools.js';

export class AppDataApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    const tools = [
      new AppDataGoogleAppListingsSearchTool(this.dataForSEOClient),
      new AppDataAppleAppListingsSearchTool(this.dataForSEOClient),
      new AppDataGoogleCategoriesTool(this.dataForSEOClient),
      new AppDataGoogleLocationsTool(this.dataForSEOClient),
      new AppDataGoogleLanguagesTool(this.dataForSEOClient),
      new AppDataAppleCategoriesTool(this.dataForSEOClient),
      new AppDataAppleLocationsTool(this.dataForSEOClient),
      new AppDataAppleLanguagesTool(this.dataForSEOClient),
    ];

    return tools.reduce((acc, tool) => ({
      ...acc,
      [tool.getName()]: {
        description: tool.getDescription(),
        params: tool.getParams(),
        handler: (params: any) => tool.handle(params),
      },
    }), {});
  }

  getPrompts(): Record<string, PromptDefinition> {
    return {};
  }
}
