import { BaseTool } from '../../../base.tool.js';
import { z } from 'zod';
export class GoogleAdsLocationsListTool extends BaseTool {
    constructor(dataForSEOClient) {
        super(dataForSEOClient);
    }
    getName() {
        return 'kw_data_google_ads_locations';
    }
    getDescription() {
        return 'Utility tool for kw_data_google_ads_search_volume to get list of availible locations.';
    }
    getParams() {
        return {
            country_iso_code: z.string().describe("ISO 3166-1 alpha-2 country code, for example: US, GB, MT"),
            location_type: z.string().optional().describe("Type of location. Possible variants: 'TV Region','Postal Code','Neighborhood','Governorate','National Park','Quarter','Canton','Airport','Okrug','Prefecture','City','Country','Province','Barrio','Sub-District','Congressional District','Municipality District','district','DMA Region','Union Territory','Territory','Colloquial Area','Autonomous Community','Borough','County','State','District','City Region','Commune','Region','Department','Division','Sub-Ward','Municipality','University'"),
            location_name: z.string().optional().describe("Name of location or it`s part.")
        };
    }
    async handle(params) {
        try {
            const payload = {
                'country_iso_code': params.country_iso_code,
            };
            if (params.location_type) {
                payload['location_type'] = params.location_type;
            }
            if (params.location_name) {
                payload['location_name'] = params.location_name;
            }
            const response = await this.dataForSEOClient.makeRequest(`/v3/keywords_data/google_ads/locations`, 'POST', [payload]);
            return this.validateAndFormatResponse(response);
        }
        catch (error) {
            return this.formatErrorResponse(error);
        }
    }
}
//# sourceMappingURL=google-ads-locations.js.map