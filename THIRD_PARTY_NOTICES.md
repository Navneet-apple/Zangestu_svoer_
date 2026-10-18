# Third-party notices

## AniKoto provider

The provider bundle in `providers/anikoto.js` is derived from the Apache-2.0-licensed provider bundle in [Serenity-MIST/zangetsu-sources](https://github.com/Serenity-MIST/zangetsu-sources), version 0.2.9. The local changes for this repository are the source ID and manifest integration; the file header records this modification.

The upstream project states that its anime parsing, VRF transformation, site definitions, and direct-stream extraction are adapted from [Yuzono anime-extensions](https://github.com/yuzono/anime-extensions), notably `AnikotoTheme.kt`, `AnikotoExtractor.kt`, `Anikoto.kt`, `AniWave.kt`, and `KotoKai.kt`. Upstream attribution names **Copyright 2015 Javier Tomás** and Yuzono contributors. These components are licensed under the Apache License, Version 2.0; a copy is provided in [LICENSE-APACHE-2.0](LICENSE-APACHE-2.0).

The upstream project also credits the public MegaPlay web player's response/signing protocol. The provider implements the required compatibility routines locally and does not load those player scripts at runtime.

This is an independent community source, not an official Zangetsu or AniKoto project. Third-party names and websites remain the property of their respective owners. The code license does not grant rights to stream or redistribute media.
