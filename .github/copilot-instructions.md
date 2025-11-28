# Copilot Instructions for Trousse ou Dard

## Project Overview

Vue 3 party games app featuring 5 games (Trousse, Joke, Prefer, Ten But, How Much). All content is stored remotely on JSONBin.io. Built with Vite, Vue Router, Pinia, Tailwind CSS, and Headless UI.

## Critical Architecture Pattern: Unified Game Store

**The app uses a single Pinia store (`src/stores/games.js`) for all game types**.

All games share the same data structure:

```javascript
games: {
  trousse: { content: [], loaded: false },
  joke: { content: [], loaded: false }
  // ... etc
}
```

Game types are string keys: `'trousse'`, `'joke'`, `'prefer'`, `'ten'`, `'howMuch'`

**Store API pattern used in all game views:**

```javascript
// In view component onMounted
await gameStore.loadGameContent('trousse') // Auto-checks if loaded
const phrases = computed(() => gameStore.getGameContent('trousse'))
await gameStore.addGameContent('trousse', newPhrase)
```

## Adding New Games

1. Add bin ID to `GAME_BIN_IDS` in `src/stores/games.js`
2. Add game state to `games` object in store
3. Add `VITE_NEWGAME_BIN_ID` to `.env` (**escape `$` as `\$` in .env only**, not on Vercel)
4. Create view in `src/views/` using the store pattern (see `TrousseView.vue`)
5. Add lazy-loaded route in `src/router/index.js`
6. Add `<HomeCard>` to `HomeView.vue`

## JSONBin.io Integration

All bins must follow this structure:

```json
{
  "content": ["phrase 1", "phrase 2", ...]
}
```

API layer (`src/api/storeApi.js`) handles fetch/update using `X-Access-Key` header.

## Development Workflows

```bash
yarn dev # Dev server
yarn lint # Check with ESLint + Prettier
yarn lint:fix # Auto-fix linting issues
yarn build # Production build
```

**Linting is enforced via Husky pre-commit hooks** using `lint-staged`.

## Component Patterns

**Reusable components** in `src/components/`:

- `HomeCard.vue` - Game cards with `title`, `desc`, `link`, `customClass` props
- `ButtonPrimary.vue` / `ButtonOutline.vue` - Buttons with customizable `bg-class`, `focus-class`
- `ModalForm.vue` - Headless UI modal wrapper with `is-open`, `modal-title`, size variants

**View component structure** (see `TrousseView.vue`):

- Load game content in `onMounted`
- Track displayed items to avoid repeats (`displayedPhrases` ref)
- Use modals for adding content and viewing all items
- Handle async state with loading flags (`isAddingPhrase`)

## Styling Conventions

- Tailwind utility classes throughout
- Custom theme colors: `base: '#284b63'`, `mainBg: '#f8f8f8'`
- Custom font: `Nunito` (sans-serif)
- `@tailwindcss/forms` plugin for form styling
- Color coding per game (sky-600, teal-600, amber-600, rose-600, gray-500)
- Responsive design with `sm:` breakpoints

## Router Configuration

- Uses `createWebHistory` (not hash mode)
- Lazy-loaded views via `import()` (except HomeView)
- Route names match game types for consistency

## Environment Variables

Required in `.env`:

```
VITE_TROUSSE_BIN_ID="xxxxxx"
VITE_JOKE_BIN_ID="xxxxxx"
VITE_PREFER_BIN_ID="xxxxxx"
VITE_TEN_BIN_ID="xxxxxx"
VITE_HOWMUCH_BIN_ID="xxxxxx"
VITE_JSONBIN_API_KEY="\$5f\$42\$xxxxxxx"  # Escape $ in .env
```

**Important:** Vercel deployment does NOT require escaping `$` character.

## PWA Configuration

Vite PWA plugin configured for auto-update. Manifest in `vite.config.js` with theme color `#e2001a`.

## ESLint Rules

- Flat config format (`eslint.config.js`)
- `vue/multi-word-component-names`: off
- Console/debugger warnings in production only
- Prettier integration via `eslint-config-prettier`
