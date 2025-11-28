# Copilot Instructions for Trousse ou Dard

## Project Overview

Vue 3 party game app with multiple mini-games. Each game displays random content from JSONBin.io and allows users to add new items.

## Tech Stack

- **Vue 3** with Composition API (`<script setup>`)
- **Pinia** for state management
- **Vue Router** with lazy-loaded game views
- **Tailwind CSS** with custom colors (`base: #284b63`, `mainBg: #f8f8f8`)
- **Headless UI** for modals, **Heroicons** for icons
- **Vite** + **vite-plugin-pwa**

## Commands

```bash
yarn dev      # Start dev server
yarn build    # Production build (uses vite build directly)
yarn lint     # ESLint with auto-fix
yarn format   # Prettier formatting
```

## Architecture Patterns

### Data Flow: JSONBin.io Integration

All game data stored remotely in JSONBin.io bins. API wrapper in `src/api/storeApi.js`:

- `fetchApi(binId)` - GET content array from bin
- `addContentApi(binId, oldContent, newContent)` - PUT updated array

Bin IDs configured via env vars: `VITE_TROUSSE_BIN_ID`, `VITE_JOKE_BIN_ID`, etc.

### Store Pattern (src/stores/)

Each game has identical store structure. Follow `phrases.js` as template:

```javascript
state: () => ({ phrases: [], loaded: false })
// getPhrases() - fetch only if not loaded (caching)
// addPhrase(newPhrase) - append via addContentApi
```

### View Pattern (src/views/)

All game views follow the same UX pattern - see `TrousseView.vue` as reference:

1. Display random item, track shown items in `displayedPhrases` ref
2. Filter out shown items until all displayed, then reset
3. Two modals: add new content + view all content
4. Use `ButtonPrimary`, `ButtonOutline`, `ModalForm` components

### Component Styling Convention

Buttons accept dynamic Tailwind classes via props for theming per game:

```vue
<ButtonPrimary bg-class="bg-sky-600" focus-class="focus-visible:outline-sky-600" />
```

### Routing

- Home view (`/`) - eagerly loaded
- Game views - lazy loaded: `component: () => import('../views/GameView.vue')`

## Adding a New Game

1. Create JSONBin.io bin with `{"content": []}`
2. Add `VITE_NEWGAME_BIN_ID` to `.env`
3. Create store in `src/stores/` following `phrases.js` pattern
4. Create view in `src/views/` following `TrousseView.vue` pattern
5. Add lazy-loaded route in `src/router/index.js`
6. Add card to `HomeView.vue`

## Environment Setup

Required `.env` file (escape `$` locally, not on Vercel):

```
VITE_TROUSSE_BIN_ID="xxxxx"
VITE_JOKE_BIN_ID="xxxxx"
VITE_PREFER_BIN_ID="xxxxx"
VITE_TEN_BIN_ID="xxxxx"
VITE_HOW_MUCH_BIN_ID="xxxxx"
VITE_JSONBIN_API_KEY="\$5f\$42\$xxxxx"
```

## Code Style

- Use `@/` alias for imports from `src/`
- French UI text (this is a French party game)
- Husky + lint-staged runs on commit
