# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Trousse ou Dard** is a party game application with multiple mini-games. Originally a "truth or dare" generator (only truths), it has evolved to include several games like dad jokes, "tu préfères" (would you rather), and more. The app uses JSONBin.io as a backend to store and manage game content.

## Development Commands

```bash
# Install dependencies
pnpm install

# Run development server (Nuxt dev server on http://localhost:3000)
pnpm run dev

# Build for production
pnpm run build

# Preview production build locally
pnpm run preview

# Generate static site
pnpm run generate

# Linting and formatting
pnpm run lint          # Check code with Prettier and ESLint
pnpm run lint:fix      # Auto-fix formatting and linting issues
```

## Architecture

### Tech Stack

- **Nuxt 3**: Full-stack Vue framework with file-based routing
- **Pinia**: State management (stores in `/stores`)
- **Tailwind CSS**: Utility-first styling with custom config
- **HeadlessUI + Heroicons**: Accessible UI components
- **Vite PWA**: Progressive Web App support
- **JSONBin.io**: External API for data storage

### Project Structure

```
/pages/*                      - Auto-routed game pages (index, trousse, joke, prefer, ten-but, how-much)
/components/*                 - Reusable Vue components (buttons, modals, cards)
/stores/games.js              - Centralized Pinia store for all game types
/composables/useStoreApi.js   - Internal API client (calls /api/games/[type])
/server/api/games/[type].get.ts  - Server route: fetch game content from JSONBin
/server/api/games/[type].post.ts - Server route: add content to JSONBin (with validation)
/assets/                      - Static assets and global CSS
app.vue                       - Root layout with navigation header
nuxt.config.ts                - Nuxt configuration with modules and runtime config
```

### Key Patterns

**Game Store Pattern** (`stores/games.js`):

- Single centralized store manages 5 game types: `trousse`, `joke`, `prefer`, `ten`, `howMuch`
- Each game has: `content` array and `loaded` boolean
- Actions: `loadGameContent(gameType)` - loads from API once, `addGameContent(gameType, newContent)` - adds new content

**API Integration**:

All JSONBin.io access goes through server-side routes (`/server/api/games/`). The API key and bin IDs are never exposed to the client.

- `composables/useStoreApi.js` calls `/api/games/[type]` via `$fetch`
- `server/api/games/[type].get.ts` — proxies GET to JSONBin, returns `content[]`
- `server/api/games/[type].post.ts` — validates input (non-empty, max 500 chars), fetches current content from JSONBin, appends, then PUTs back

**Game Page Pattern**:
All game pages follow the same structure:

1. Load content from store on mount
2. Display random phrase/question from available content
3. Track displayed items to avoid repetition until all shown
4. Modal form to add new content
5. Modal to view all content
6. Color-coded per game (e.g., sky-600 for trousse, teal-600 for joke)

### Environment Variables

All variables are **server-side only** (no `NUXT_PUBLIC_` prefix). Never move these to `runtimeConfig.public`.

```
NUXT_JSONBIN_API_KEY=$5f$42$xxxxx
NUXT_TROUSSE_BIN_ID=xxxxx
NUXT_JOKE_BIN_ID=xxxxx
NUXT_PREFER_BIN_ID=xxxxx
NUXT_TEN_BIN_ID=xxxxx
NUXT_HOWMUCH_BIN_ID=xxxxx
```

JSONBin data structure:

```json
{
  "content": ["phrase 1", "phrase 2", "phrase 3"]
}
```

### Styling Conventions

- Tailwind config extends base colors and uses Nunito font (loaded via Google Fonts)
- Game-specific color schemes: trousse (sky-600), joke (teal-600), prefer (amber-600), ten-but (rose-600), how-much (violet-600)
- Responsive design with mobile-first approach (hidden nav on mobile)
- Prettier config: single quotes, no semicolons, 2-space tabs, 100 char line width

### PWA Configuration

**Important**: The app uses `@vite-pwa/nuxt` with a specific Workbox configuration to avoid service worker errors.

**Known Issue**: With Nuxt in SSR mode (default), you must set `navigateFallback: undefined` to prevent "non-precached-url" errors in the console. The HTML routes are not statically generated in SSR mode and cannot be precached.

**Runtime Caching**: Internal game API routes are cached using NetworkFirst strategy with:

- URL pattern: `/api/games/.*`
- Cache name: `jsonbin-api-cache`
- Max entries: 10
- Max age: 24 hours
- This provides offline fallback and improves performance

See `nuxt.config.ts` → `pwa.workbox` for the complete configuration.

### Security

- JSONBin API key and bin IDs are **server-side only** — never put them in `runtimeConfig.public`
- Input validation on POST: game type whitelist, non-empty string, max 500 characters
- Security headers set via `routeRules` on all routes: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`

## Code Quality

**ESLint Configuration** (`eslint.config.js`):

- Flat config format with Vue plugin
- Prettier integration (eslint-config-prettier)
- Custom globals for Nuxt auto-imports (`useRuntimeConfig`, `$fetch`, `navigateTo`, etc.)
- Rules: multi-word component names disabled, console/debugger warnings in production

**Git Hooks** (Husky + lint-staged):

- Pre-commit: runs Prettier and ESLint on staged files
- Configured in `package.json` lint-staged section

## Notes

- This is a personal project for parties with friends - opinionated and informal
- French language throughout the UI
- English language for everything else
- Deployed on Vercel with environment variables configured
- No tests currently in the project
