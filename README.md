<div align="center">
  <h1>Trousse ou Dard</h1>
  <p>A little app with silly games just for parties with my buddies.</p>
</div>

<div align="center">

[![Putain de CI](https://github.com/Manoz/trousse-ou-dard/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/Manoz/trousse-ou-dard/actions/workflows/main.yml)
[![version]][version]
[![licenses][licenses]][licenses-url]

</div>

## Context

**"Trousse ou Dard"** was originally a generator of "truth or dare" phrases (but only "truths") that we can use for a "Hot Ones" party with my friends.
_"Trousse"_ and _"Dard"_ are French puns meaning "Truth" and "Dare".

I eventually evolved the application by adding another game: "jokes de papa".
I wanted to keep the name "trousse ou dard" simply because it made me smile :)

## Development

1. Clone the app using
   `git clone git@github.com:Manoz/trousse-ou-dard.git`

2. Install dependencies using `pnpm install`
3. Run the app using `pnpm run dev`

**Using JSONBin.io**

The app uses [jsonbin.io](https://jsonbin.io) to store the data. All API calls go through a server-side proxy — the API key is never exposed to the client.

1. Go to https://jsonbin.io/ and create a new account.
2. Go to https://jsonbin.io/app/api-keys, create and copy your API key (`X-ACCESS-KEY`).
3. Create one bin per game type. Each bin must contain the following JSON structure:

```json
{
  "content": ["phrase 1", "phrase 2", "phrase 3"]
}
```

4. Copy each bin ID and add everything to your `.env` file:

```
NUXT_JSONBIN_API_KEY="$5f$42$xxxxxxx"
NUXT_TROUSSE_BIN_ID=xxxxxxx
NUXT_JOKE_BIN_ID=xxxxxxx
NUXT_PREFER_BIN_ID=xxxxxxx
NUXT_TEN_BIN_ID=xxxxxxx
NUXT_HOWMUCH_BIN_ID=xxxxxxx
```

> Note: the `$` character does not need to be escaped in Nuxt `.env` files or on Vercel.

## Linting

This project uses [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for linting and formatting.

```bash
pnpm run lint        # Check
pnpm run lint:fix    # Auto-fix
```

## Deployment

The app is deployed on [Vercel](https://vercel.com/). Add the environment variables listed above to your deployment environment — no `NUXT_PUBLIC_` prefix, since all sensitive config is server-side only.

## Contributing

Feel free to contribute to this project. I'm open to any suggestions. Just create an issue or a PR and I'll take a look at it. The contribution guide can be found [here](.github/CONTRIBUTING.md).

## License

Licensed under the MIT License, Copyright © Manoz.

See [LICENSE](https://github.com/Manoz/trousse-ou-dard/blob/main/LICENSE) for more information.

[licenses-url]: https://github.com/Manoz/trousse-ou-dard/blob/main/LICENSE
[licenses]: https://img.shields.io/badge/license-MIT-blue.svg
[version]: https://img.shields.io/badge/version-1.0.1-%23d85a94.svg
