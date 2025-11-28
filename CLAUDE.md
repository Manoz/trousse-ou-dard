# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Trousse ou Dard** is a Vue 3 party games app featuring multiple silly games:

- **Trousse**: Truth or Dare questions (originally for "Hot Ones" parties)
- **Joke**: Dad jokes ("jokes de papa")
- **Prefer**: "Would you rather" questions
- **Ten But**: "10 but..." game
- **How Much**: "Pour combien" (How much would you...) game

All game content is stored remotely on JSONBin.io and fetched at runtime.

## Development Commands

```bash
# Install dependencies
yarn

# Run dev server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Run linting (checks only)
yarn lint

# Run linting with auto-fix
yarn lint:fix
```

## Architecture

### State Management Pattern

The app uses a **unified Pinia store** (`src/stores/games.js`) that manages all game types through a single store. This replaced the original approach of having separate stores for each game.

**Key pattern:**

- All games share the same data structure: `{ content: [], loaded: false }`
- Game types are identified by string keys: `'trousse'`, `'joke'`, `'prefer'`, `'ten'`, `'howMuch'`
- Each game type maps to a specific JSONBin ID via the `GAME_BIN_IDS` constant
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

1. **View Component** (e.g., `TrousseView.vue`) calls `loadGameContent('trousse')` on mount
2. **Game Store** checks if content is already loaded (to avoid duplicate fetches)
3. **API Layer** (`src/api/storeApi.js`) fetches from JSONBin.io using the bin ID
4. **Store** updates state with content and marks game as loaded
5. **View** accesses content via `getGameContent('trousse')` getter

### Adding New Games

To add a new game type:

1. Add the bin ID to `GAME_BIN_IDS` in `src/stores/games.js`
2. Add the game state to the `games` object in store state
3. Add the environment variable `VITE_NEWGAME_BIN_ID` to `.env`
4. Create a view component in `src/views/` that uses the store pattern
5. Add a route in `src/router/index.js`
6. Add a card to `HomeView.vue` using the `HomeCard` component

### Environment Variables

The app requires these environment variables in `.env`:

```
VITE_TROUSSE_BIN_ID="xxxxxx"
VITE_JOKE_BIN_ID="xxxxxx"
VITE_PREFER_BIN_ID="xxxxxx"
VITE_TEN_BIN_ID="xxxxxx"
VITE_HOWMUCH_BIN_ID="xxxxxx"
VITE_JSONBIN_API_KEY="\$5f\$42\$xxxxxxx"  # Note: $ must be escaped in .env
```

**Important:** On Vercel deployment, the `$` character in the API key does NOT need to be escaped.

### JSONBin.io Integration

All game content follows this JSON structure in JSONBin:

```json
{
  "content": ["phrase 1", "phrase 2", "phrase 3"]
}
```

API interactions are handled by two functions in `src/api/storeApi.js`:

- `fetchApi(binId)` - GET request to retrieve content
- `addContentApi(binId, oldContent, newContent)` - PUT request to add new content

### Component Structure

- **Views** (`src/views/`) - Route-level components for each game, handle store interactions
- **Reusable Components** (`src/components/`):
  - `HomeCard.vue` - Game cards on home page
  - `ButtonPrimary.vue` / `ButtonOutline.vue` - Styled button components
  - `ModalForm.vue` - Modal for adding new content

### Styling

- Uses **Tailwind CSS** with custom configuration
- TailwindCSS Forms plugin for form styling
- HeadlessUI for accessible UI components (modals, transitions)
- Heroicons for icons

### PWA Configuration

The app is configured as a Progressive Web App using `vite-plugin-pwa`:

- Auto-updates on new versions
- Caches static assets (JS, CSS, HTML, images, fonts)
- Manifest configured for Android installation
- Theme color: `#e2001a`

### Code Quality

- **ESLint 9** with flat config format (`eslint.config.js`)
- Vue-specific rules via `eslint-plugin-vue`
- **Prettier** for code formatting
- Pre-commit hooks via **Husky** + **lint-staged** to enforce linting and formatting
- All code must pass linting with zero warnings (`--max-warnings=0`)

### Router Configuration

Uses Vue Router with:

- Web history mode
- Lazy-loaded routes (except home) for better performance
- Route paths: `/`, `/trousse`, `/joke`, `/prefer`, `/ten-but`, `/how-much`
