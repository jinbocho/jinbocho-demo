# jinbocho-demo

[![Deploy](https://github.com/jinbocho/jinbocho-demo/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/jinbocho/jinbocho-demo/actions/workflows/deploy-pages.yml)
[![License](https://img.shields.io/badge/license-source--available-lightgrey)](LICENSE)

Live, click-through demo of the Jinbocho UI, deployed to GitHub Pages.

**Live**: https://jinbocho.github.io/jinbocho-demo/

## What this is

Same React frontend as the real product, wired to static in-memory mock data
(`src/data/*.ts`) instead of the backend microservices. No sign-up, nothing
persists between reloads, safe to click around. Not connected to any Jinbocho
API — to run the real thing against your own library, see
[jinbocho-install-community-v1](https://github.com/jinbocho/jinbocho-install-community-v1).

## Development

```bash
npm install
npm run dev       # http://localhost:5180
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Deployment

Pushes to `main` build and deploy automatically via
[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).

## License

Source-available, personal/non-commercial use only — see [LICENSE](LICENSE).
Commercial use: info@jinbocho.eu.
