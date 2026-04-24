# Sketric Fork Notes

This is a fork of [`dataforseo/mcp-server-typescript`](https://github.com/dataforseo/mcp-server-typescript).

## What's added on top of upstream

Two modules that upstream does not expose yet:

### `APP_DATA` — App Store + Google Play (ASO)
8 tools under `src/core/modules/app-data/`:
- `app_data_google_app_listings_search` — keyword + category search on Google Play
- `app_data_apple_app_listings_search` — same on the Apple App Store
- `app_data_google_categories`, `app_data_google_locations`, `app_data_google_languages`
- `app_data_apple_categories`, `app_data_apple_locations`, `app_data_apple_languages`

### `MERCHANT` — Amazon + Google Shopping
10 tools under `src/core/modules/merchant/`:
- `merchant_amazon_products_task_post` / `_task_get` — Amazon product SERP
- `merchant_amazon_asin_task_post` / `_task_get` — single ASIN detail
- `merchant_google_products_task_post` / `_task_get` — Google Shopping SERP
- `merchant_amazon_locations`, `merchant_amazon_languages`
- `merchant_google_locations`, `merchant_google_languages`

Merchant endpoints are task-based (post → poll → get). DataForSEO does not expose live endpoints for these.

## Integration points vs. upstream

Two files changed beyond adding new modules:
- `src/core/config/modules.config.ts` — `APP_DATA` and `MERCHANT` appended to `AVAILABLE_MODULES`
- `src/core/utils/module-loader.ts` — imports + conditional push for both modules

Everything else is additive; conflicts during upstream rebase should be rare and confined to those two files.

## Installing

```bash
npm install -g github:alisadiq-ai/sketric-dataforseo-mcp
# or pin a tag:
npm install -g github:alisadiq-ai/sketric-dataforseo-mcp#v2.9.0-sketric.1
```

The `prepare` script builds on install, so consumers don't need tsc locally.

Binary is exposed as both `sketric-dataforseo-mcp` (preferred) and `dataforseo-mcp-server` (drop-in replacement).

## Syncing with upstream

```bash
git remote add upstream https://github.com/dataforseo/mcp-server-typescript.git  # one time
git fetch upstream
git rebase upstream/main
# resolve conflicts in modules.config.ts and module-loader.ts if any
npm run build && npm test  # sanity check
git push --force-with-lease origin main
git tag v2.9.x-sketric.N && git push --tags
```

Then bump the tag reference in `skills-mcps-plugins/sketric-dataforseo-plugin-v0.X/skills/setup-dataforseo-mcp/SKILL.md` so new installs pick up the sync.

## Upstream PR

An upstream PR to add APP_DATA and MERCHANT is planned once the modules have proven stable in team use. Both modules follow the existing `BaseTool` / `BaseModule` patterns exactly so the PR should be mergeable without structural changes.

## License

Apache-2.0, same as upstream.
