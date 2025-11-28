# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Trousse ou Dard** is a Nuxt 3 party games app featuring multiple silly games:

- **Trousse**: Truth or Dare questions (originally for "Hot Ones" parties)
- **Joke**: Dad jokes ("jokes de papa")
- **Prefer**: "Would you rather" questions
- **Ten But**: "10 but..." game
- **How Much**: "Pour combien" (How much would you...) game

All game content is stored remotely on JSONBin.io and fetched at runtime.

## Development Commands

```bash
# Install dependencies (also runs nuxt prepare)
yarn

# Run dev server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Generate static site
yarn generate

# Run linting (checks only)
yarn lint

# Run linting with auto-fix
yarn lint:fix
```

## Architecture

### Framework: Nuxt 3

The app uses **Nuxt 3** for:

- **File-based routing** - Pages automatically become routes based on their filename in `pages/`
- **Auto-imports** - Components, composables, and utilities are automatically imported
- **Server-side rendering** - Better SEO and performance with SSR/SSG capabilities
- **Built-in state management** - Pinia integrated via `@pinia/nuxt` module
- **PWA support** - Via `@vite-pwa/nuxt` module
- **Tailwind CSS** - Via `@nuxtjs/tailwindcss` module

### State Management Pattern

The app uses a **unified Pinia store** (`stores/games.js`) that manages all game types through a single store.

**Key pattern:**

- All games share the same data structure: `{ content: [], loaded: false }`
- Game types are identified by string keys: `'trousse'`, `'joke'`, `'prefer'`, `'ten'`, `'howMuch'`
- Each game type maps to a specific JSONBin ID accessed via `useRuntimeConfig()`
- The store provides generic getters and actions that work with any game type

**Store API:**

```javascript
// Actions
await loadGameContent(gameType) // Load content from API if not already loaded
await addGameContent(gameType, newContent) // Add new content and sync to API

// Getters
getGameContent(gameType) // Returns content array
isGameLoaded(gameType) // Returns loaded status
```

### Data Flow

1. **Page Component** (e.g., `pages/trousse.vue`) calls `loadGameContent('trousse')` on mount
2. **Game Store** checks if content is already loaded (to avoid duplicate fetches)
3. **API Composable** (`composables/useStoreApi.js`) fetches from JSONBin.io using the bin ID
4. **Store** updates state with content and marks game as loaded
5. **Page** accesses content via `getGameContent('trousse')` getter

### Adding New Games

To add a new game type:

1. Update `getGameBinIds()` in `stores/games.js` to include the new bin ID from runtime config
2. Add the game state to the `games` object in store state
3. Add the environment variable `NUXT_PUBLIC_NEWGAME_BIN_ID` to `.env`
4. Add the variable to `nuxt.config.ts` under `runtimeConfig.public`
5. Create a page component in `pages/` (e.g., `pages/newgame.vue`)
6. Add a card to `pages/index.vue` using the `HomeCard` component
7. Add a navigation link in `app.vue`

### Environment Variables

The app requires these environment variables in `.env`:

```
NUXT_PUBLIC_TROUSSE_BIN_ID="xxxxxx"
NUXT_PUBLIC_JOKE_BIN_ID="xxxxxx"
NUXT_PUBLIC_PREFER_BIN_ID="xxxxxx"
NUXT_PUBLIC_TEN_BIN_ID="xxxxxx"
NUXT_PUBLIC_HOWMUCH_BIN_ID="xxxxxx"
NUXT_PUBLIC_JSONBIN_API_KEY="$5f$42$xxxxxxx"
```

**Important:** In Nuxt, environment variables are accessed via `useRuntimeConfig()` and must be defined in `nuxt.config.ts` under `runtimeConfig.public` to be available client-side. The `$` character does NOT need to be escaped in `.env` files.

### JSONBin.io Integration

All game content follows this JSON structure in JSONBin:

```json
{
  "content": ["phrase 1", "phrase 2", "phrase 3"]
}
```

API interactions are handled by two functions in `composables/useStoreApi.js`:

- `fetchApi(binId)` - GET request to retrieve content
- `addContentApi(binId, oldContent, newContent)` - PUT request to add new content

These functions use `useRuntimeConfig()` to access the JSONBin API key.

### Project Structure

```
.
├── app.vue                 - Main layout with navigation and NuxtPage
├── nuxt.config.ts         - Nuxt configuration (modules, PWA, runtime config)
├── pages/                 - File-based routes
│   ├── index.vue         - Home page with game cards
│   ├── trousse.vue       - Truth or dare game
│   ├── joke.vue          - Jokes game
│   ├── prefer.vue        - Would you rather game
│   ├── ten-but.vue       - 10 but... game
│   └── how-much.vue      - How much game
├── components/           - Auto-imported Vue components
│   ├── HomeCard.vue
│   ├── ButtonPrimary.vue
│   ├── ButtonOutline.vue
│   └── ModalForm.vue
├── composables/          - Auto-imported composables
│   └── useStoreApi.js    - JSONBin API functions
├── stores/               - Pinia stores
│   └── games.js          - Unified game store
├── assets/               - Styles and images
│   └── main.css          - Tailwind CSS entry point
└── public/               - Static assets (icons, etc.)
```

### Routing

Nuxt uses **file-based routing**:

- `pages/index.vue` → `/`
- `pages/trousse.vue` → `/trousse`
- `pages/joke.vue` → `/joke`
- `pages/prefer.vue` → `/prefer`
- `pages/ten-but.vue` → `/ten-but`
- `pages/how-much.vue` → `/how-much`

Use `<NuxtLink>` for navigation instead of `<RouterLink>`. All routes are automatically code-split.

### Styling

- Uses **Tailwind CSS** with custom configuration (`tailwind.config.js`)
- Custom colors: `base: #284b63`, `mainBg: #f8f8f8`
- Custom font: Nunito
- TailwindCSS Forms plugin for form styling
- HeadlessUI for accessible UI components (modals, transitions)
- Heroicons for icons

### PWA Configuration

The app is configured as a Progressive Web App using `@vite-pwa/nuxt`:

- Auto-updates on new versions
- Caches static assets (JS, CSS, HTML, images, fonts)
- Manifest configured for Android installation
- Theme color: `#e2001a`
- Configuration in `nuxt.config.ts` under `pwa`

### Code Quality

- **ESLint 9** with flat config format (`eslint.config.js`)
- Vue-specific rules via `eslint-plugin-vue`
- **Prettier** for code formatting
- Pre-commit hooks via **Husky** + **lint-staged** to enforce linting and formatting
- All code must pass linting with zero warnings (`--max-warnings=0`)

### Key Differences from Previous Vite/Vue Router Setup

1. **No manual routing** - Routes are file-based, no need for `router/index.js`
2. **No manual imports** - Components and composables are auto-imported
3. **Runtime config** - Environment variables accessed via `useRuntimeConfig()` instead of `import.meta.env`
4. **NuxtLink/NuxtPage** - Use instead of RouterLink/RouterView
5. **app.vue** - Main layout instead of `src/App.vue`
6. **Automatic optimization** - Code splitting, tree shaking, and optimizations are automatic
