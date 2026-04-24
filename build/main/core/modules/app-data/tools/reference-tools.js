import { BaseTool } from '../../base.tool.js';
/**
 * Reference endpoints for App Data API (GET).
 * Return canonical lists of locations, categories, and languages for
 * Google Play Store and Apple App Store targeting.
 */
class AppDataReferenceTool extends BaseTool {
    constructor(client) {
        super(client);
    }
    getParams() {
        return {};
    }
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
export class AppDataGoogleCategoriesTool extends AppDataReferenceTool {
    getName() { return 'app_data_google_categories'; }
    getDescription() { return 'List of Google Play Store categories available for filtering app listings searches. Returns category codes and names.'; }
    endpoint() { return '/v3/app_data/google/categories'; }
}
export class AppDataGoogleLocationsTool extends AppDataReferenceTool {
    getName() { return 'app_data_google_locations'; }
    getDescription() { return 'List of geographic locations supported for Google Play Store app data targeting. Returns location codes (use as location_code param).'; }
    endpoint() { return '/v3/app_data/google/locations'; }
}
export class AppDataGoogleLanguagesTool extends AppDataReferenceTool {
    getName() { return 'app_data_google_languages'; }
    getDescription() { return 'List of languages supported for Google Play Store app data. Returns language codes (use as language_code param).'; }
    endpoint() { return '/v3/app_data/google/languages'; }
}
export class AppDataAppleCategoriesTool extends AppDataReferenceTool {
    getName() { return 'app_data_apple_categories'; }
    getDescription() { return 'List of Apple App Store categories available for filtering app listings searches. Returns category codes and names.'; }
    endpoint() { return '/v3/app_data/apple/categories'; }
}
export class AppDataAppleLocationsTool extends AppDataReferenceTool {
    getName() { return 'app_data_apple_locations'; }
    getDescription() { return 'List of geographic locations supported for Apple App Store app data targeting.'; }
    endpoint() { return '/v3/app_data/apple/locations'; }
}
export class AppDataAppleLanguagesTool extends AppDataReferenceTool {
    getName() { return 'app_data_apple_languages'; }
    getDescription() { return 'List of languages supported for Apple App Store app data.'; }
    endpoint() { return '/v3/app_data/apple/languages'; }
}
//# sourceMappingURL=reference-tools.js.map