import { z } from 'zod';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';
import { BaseTool } from '../../base.tool.js';

/**
 * Reference endpoints for App Data API (GET).
 * Return canonical lists of locations, categories, and languages for
 * Google Play Store and Apple App Store targeting.
 */

abstract class AppDataReferenceTool extends BaseTool {
  constructor(client: DataForSEOClient) {
    super(client);
  }

  protected abstract endpoint(): string;

  getParams(): z.ZodRawShape {
    return {};
  }

  async handle(_params: any): Promise<any> {
    try {
      const response = await this.dataForSEOClient.makeRequest(this.endpoint(), 'GET');
      return this.validateAndFormatResponse(response);
    } catch (error) {
      return this.formatErrorResponse(error);
    }
  }
}

export class AppDataGoogleCategoriesTool extends AppDataReferenceTool {
  getName() { return 'app_data_google_categories'; }
  getDescription() { return 'List of Google Play Store categories available for filtering app listings searches. Returns category codes and names.'; }
  protected endpoint() { return '/v3/app_data/google/categories'; }
}

export class AppDataGoogleLocationsTool extends AppDataReferenceTool {
  getName() { return 'app_data_google_locations'; }
  getDescription() { return 'List of geographic locations supported for Google Play Store app data targeting. Returns location codes (use as location_code param).'; }
  protected endpoint() { return '/v3/app_data/google/locations'; }
}

export class AppDataGoogleLanguagesTool extends AppDataReferenceTool {
  getName() { return 'app_data_google_languages'; }
  getDescription() { return 'List of languages supported for Google Play Store app data. Returns language codes (use as language_code param).'; }
  protected endpoint() { return '/v3/app_data/google/languages'; }
}

export class AppDataAppleCategoriesTool extends AppDataReferenceTool {
  getName() { return 'app_data_apple_categories'; }
  getDescription() { return 'List of Apple App Store categories available for filtering app listings searches. Returns category codes and names.'; }
  protected endpoint() { return '/v3/app_data/apple/categories'; }
}

export class AppDataAppleLocationsTool extends AppDataReferenceTool {
  getName() { return 'app_data_apple_locations'; }
  getDescription() { return 'List of geographic locations supported for Apple App Store app data targeting.'; }
  protected endpoint() { return '/v3/app_data/apple/locations'; }
}

export class AppDataAppleLanguagesTool extends AppDataReferenceTool {
  getName() { return 'app_data_apple_languages'; }
  getDescription() { return 'List of languages supported for Apple App Store app data.'; }
  protected endpoint() { return '/v3/app_data/apple/languages'; }
}
