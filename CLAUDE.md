# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Trousse ou Dard** is a Vue 3 party game application featuring multiple silly games. Originally a "truth or dare" phrase generator (French puns: "Trousse" = Truth, "Dard" = Dare), it has evolved to include several games:
- Trousse (truth questions for "Hot Ones" parties)
- Jokes de papa (dad jokes)
- Prefer (would you rather)
- Ten But (10/10 but...)
- How Much (pour combien - "for how much")

## Development Commands

```bash
# Start development server
yarn dev

# Build for production
vite build

# Preview production build
yarn preview

# Linting and formatting
yarn lint          # Run ESLint with auto-fix
yarn format        # Format with Prettier
```

## Architecture

### Tech Stack
- **Framework**: Vue 3 (Composition API with `<script setup>`)
- **State Management**: Pinia stores
- **Routing**: Vue Router
- **Styling**: Tailwind CSS with custom theme colors (`base: #284b63`, `mainBg: #f8f8f8`)
- **UI Components**: Headless UI (for modals/dialogs)
- **Icons**: Heroicons
- **Build Tool**: Vite
- **PWA**: vite-plugin-pwa (auto-update, service worker)

### Data Storage Pattern
All game data is stored in JSONBin.io (remote JSON storage):
- Each game has its own bin ID defined in environment variables
- Data structure: `{ "content": ["item1", "item2", ...] }`
- API wrapper in `src/api/storeApi.js` handles fetch/update operations

### Store Pattern
Each game follows the same Pinia store pattern (`src/stores/`):
- `state`: Contains `phrases`/`jokes`/etc array and `loaded` boolean
- `fetchPhrases()`: Calls `fetchApi()` from storeApi.js
- `getPhrases()`: Only fetches if not already loaded (caching)
- `addPhrase()`: Calls `addContentApi()` to append new content

Example stores: `phrases.js`, `jokes.js`, `prefer.js`, `ten-but.js`, `how-much.js`

### View Pattern
All game views (`src/views/`) follow a consistent pattern:
1. Display random item from store
2. Button to get another random item (avoiding duplicates until all shown)
3. Modal to add new content
4. Modal to view all content
5. Uses shared components: `ButtonPrimary`, `ButtonOutline`, `ModalForm`

Random display logic:
- Tracks shown items in `displayedPhrases` ref
- Filters out already-shown items
- Resets when all items displayed

### Routing
- Home view (`/`) - eager loaded
- All game views - lazy loaded with `() => import()`
- Routes: `/trousse`, `/joke`, `/prefer`, `/ten-but`, `/how-much`

### Reusable Components (`src/components/`)
- `ButtonPrimary` - Primary action button with customizable colors
- `ButtonOutline` - Secondary outline button
- `ModalForm` - Headless UI modal wrapper
- `HomeCard` - Card component for home menu

## Environment Variables

Required `.env` variables (see README for setup):
```
VITE_TROUSSE_BIN_ID="xxxxxx"     # Trousse game bin
VITE_JOKE_BIN_ID="xxxxxx"         # Jokes game bin
VITE_PREFER_BIN_ID="xxxxxx"       # Prefer game bin
VITE_TEN_BIN_ID="xxxxxx"          # Ten But game bin
VITE_JSONBIN_API_KEY="$xx$xx$xxx" # JSONBin API access key
```

**Important**: When setting up locally, escape `$` characters in `.env` file (e.g., `\$5f\$42\$xxx`). On Vercel deployment, escaping is not needed.

## Adding a New Game

To add a new game, follow the existing pattern:

1. Create new bin on JSONBin.io with structure: `{"content": []}`
2. Add bin ID to `.env`: `VITE_NEWGAME_BIN_ID="xxxxx"`
3. Create Pinia store in `src/stores/newgame.js` (copy from `phrases.js`)
4. Create view in `src/views/NewGameView.vue` (copy from `TrousseView.vue`)
5. Add route to `src/router/index.js`
6. Add card to `HomeView.vue` using `HomeCard` component

## Code Style

- Uses ESLint with `@novius/eslint-config-vue`
- Prettier for formatting
- Husky + lint-staged for pre-commit hooks
- Tailwind utility classes for all styling (no custom CSS)
- Composition API with `<script setup>` syntax
- Path alias: `@` maps to `src/`

## Deployment

- Deployed on Vercel
- Environment variables must be set in Vercel dashboard
- PWA auto-updates on new deployments
