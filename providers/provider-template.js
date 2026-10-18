/*
 * Zangetsu provider template — NOT a working source.
 *
 * Verify these signatures against the current Zangetsu app/provider API before
 * implementing and publishing a provider. Use only official/authorized APIs
 * or content you are permitted to access and stream.
 */

function getInfo() {
  return {
    name: "Provider Template",
    lang: "en",
    baseUrl: "https://example.org",
    logo: null,
    type: "anime",
    version: "0.1.0"
  };
}

function search(query, page, opts) {
  // TODO: Query an authorized catalog endpoint; return [] on empty query.
  return Promise.resolve([]);
}

function getDetail(url, opts) {
  // TODO: Return a detail object matching the current Zangetsu provider contract.
  return Promise.reject(new Error("Provider template is not configured"));
}

function getEpisodes(url, opts) {
  // TODO: Return authorized episode records, if applicable.
  return Promise.resolve([]);
}

function getVideoSources(episodeUrl, opts) {
  // TODO: Return only media URLs you are authorized to expose.
  return Promise.reject(new Error("No authorized media integration configured"));
}
