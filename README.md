# Zangestu_svoer_

Independent, rights-first provider repository for [Zangetsu](https://github.com/Spyou/Zangetsu).

## Status

This is a starter repository with a validated Zangetsu manifest, a provider-contract template, automated manifest tests, and a policy for reviewing sources before adding them.

**AniKoto is not enabled in this starter build.** The existence of a provider in another repository does not establish that its streams are licensed for redistribution or that the site authorizes third-party extraction. Add it only after confirming you have permission or a clearly authorized API/streaming route. This repository intentionally does not copy stream-extraction code or bypass access controls.

## Layout

```text
.
├── index.json
├── README.md
├── LICENSE
├── .gitignore
├── providers/
│   └── provider-template.js
└── tests/
    └── validate_manifest.py
```

## Add this repository to Zangetsu

1. Open **Settings → Sources → Add repo** in Zangetsu.
2. Add this manifest URL:

   `https://raw.githubusercontent.com/Navneet-apple/Zangestu_svoer_/main/index.json`

3. Install only sources you have reviewed and trust.

## Provider integration policy

A source can be added when at least one of these applies:

- The source owner explicitly permits the intended integration.
- The content is public domain or appropriately licensed, and the provider respects the license and attribution terms.
- An official API or partner feed grants the required access.

Do not add providers that bypass paywalls, DRM, authentication, anti-bot protections, or other access controls. Do not redistribute stream URLs, keys, or copied provider code without permission. Respect robots.txt, rate limits, privacy, and applicable law.

## Implementing a provider

`providers/provider-template.js` documents the expected high-level functions used by provider scripts in the Zangetsu ecosystem (`getInfo`, `search`, `getDetail`, `getEpisodes`, and `getVideoSources`). It is deliberately not listed in `index.json`, because it is a template and does not fetch or play media.

Before listing a real provider, verify the current provider contract against the Zangetsu app and test the source end-to-end. The manifest validator checks repository structure only; it does not certify that a provider works or that a source is licensed.

## Run tests

Requires Python 3.9+.

```sh
python tests/validate_manifest.py
```

## License

Repository scaffolding and template code are provided under the MIT License. This license does not grant rights to third-party websites, logos, metadata, or media.
