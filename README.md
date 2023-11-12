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
   `git@github.com:Manoz/trousse-ou-dard.git`

2. Install dependencies using `yarn`.
3. Run the app using `yarn dev`.

**Using JSBin.io**

The app uses [JSBin.io](https://jsbin.io) to store the data.

1. Simply go to https://jsbin.io/ and create a new account.
2. Go to https://jsonbin.io/app/app/api-keys then create and copy your API key. In my case I use the `X-ACCESS-KEY`.
3. Copy the token and add it to your `.env` file. Don't forget to escape the `$` character. So for example if JSOnbin gives you the following token: `$5f$42$xxxxxxx`, you should escape it like this: `\$5f\$42\$xxxxxxx`.  
   Your `.env` file should look like this:

```
VITE_JSONBIN_API_KEY="\$5f\$42\$xxxxxxx"
```

4. Now create your own bin and copy the bin ID to your `.env` file.

Your final `.env` file should look like this:

```
VITE_TROUSSE_BIN_ID="xxxxxx"
VITE_JOKE_BIN_ID="xxxxxx"
VITE_JSONBIN_API_KEY="\$5f\$42\$xxxxxxx"
```

The JSON structure of the bins should be the following:

```json
{
  "content": ["phrase 1", "phrase 2", "phrase 3", "phrase 4"]
}
```

## Linting

This project uses [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for linting and formatting.

Use ESLint with:

```bash
yarn lint
```

Use Prettier with:

```bash
yarn format
```

## Deployment

My app is deployed on [Vercel](https://vercel.com/) but feel free to use whatever you want. Just add the environment variables to your deployment environment. Be careful tho, on Vercel I don't need to escape the `$` character. It might be different on other platforms.

## Contributing

Feel free to contribute to this project. I'm open to any suggestions. Just create an issue or a PR and I'll take a look at it. The contribution guide can be found [here](.github/CONTRIBUTING.md).

## License

Licensed under the MIT License, Copyright © Manoz.

See [LICENSE](https://github.com/Manoz/trousse-ou-dard/blob/main/LICENSE) for more information.

[licenses-url]: https://github.com/Manoz/trousse-ou-dard/blob/main/LICENSE
[licenses]: https://img.shields.io/badge/license-MIT-blue.svg
[version]: https://img.shields.io/badge/version-1.0.0-%23d85a94.svg
