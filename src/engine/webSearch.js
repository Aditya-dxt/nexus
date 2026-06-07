/**
 * @module webSearch
 * @description Web search engine for NEXUS. Fetches real information from
 * Wikipedia's free REST API. No API keys required.
 *
 * Two strategies:
 *   1. **Summary** — Fetches a single page summary via the REST API.
 *   2. **Search** — Searches Wikipedia for matching articles and fetches
 *      summaries for the top results.
 *
 * All requests use `origin=*` for CORS support in the browser.
 */

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const WIKI_SEARCH_API = 'https://en.wikipedia.org/w/api.php';
const WIKI_SUMMARY_API = 'https://en.wikipedia.org/api/rest_v1/page/summary';
const MAX_RESULTS = 3;
const REQUEST_TIMEOUT = 8000; // 8 seconds

/* ------------------------------------------------------------------ */
/*  Internal helpers                                                  */
/* ------------------------------------------------------------------ */

/**
 * Fetch with a timeout wrapper.
 * @param {string} url
 * @param {number} [timeout=REQUEST_TIMEOUT]
 * @returns {Promise<Response>}
 */
async function fetchWithTimeout(url, timeout = REQUEST_TIMEOUT) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    return response;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

/* ------------------------------------------------------------------ */
/*  Public API                                                        */
/* ------------------------------------------------------------------ */

/**
 * Search Wikipedia for a query and return structured results.
 *
 * @param {string} query — The search term.
 * @param {number} [limit=MAX_RESULTS] — Max results to return.
 * @returns {Promise<WikiSearchResult[]>} Array of search results.
 *
 * @typedef {object} WikiSearchResult
 * @property {string} title   — Article title.
 * @property {string} snippet — Short HTML snippet from the article.
 * @property {string} pageid  — Wikipedia page ID.
 */
export async function searchWikipedia(query, limit = MAX_RESULTS) {
  if (!query || !query.trim()) return [];

  const params = new URLSearchParams({
    action: 'query',
    list: 'search',
    srsearch: query.trim(),
    srlimit: String(limit),
    format: 'json',
    origin: '*',
    utf8: '1',
    srprop: 'snippet|titlesnippet',
  });

  try {
    const resp = await fetchWithTimeout(`${WIKI_SEARCH_API}?${params}`);
    if (!resp.ok) return [];

    const data = await resp.json();
    const results = data?.query?.search || [];

    return results.map((r) => ({
      title: r.title,
      snippet: r.snippet || '',
      pageid: r.pageid,
    }));
  } catch (err) {
    console.warn('[webSearch] Wikipedia search failed:', err.message);
    return [];
  }
}

/**
 * Fetch the summary for a specific Wikipedia article by title.
 *
 * @param {string} title — Exact Wikipedia article title.
 * @returns {Promise<WikiSummary|null>}
 *
 * @typedef {object} WikiSummary
 * @property {string} title          — Canonical article title.
 * @property {string} extract        — Plain-text summary (1-2 paragraphs).
 * @property {string} extractHtml    — HTML version of the extract.
 * @property {string} description    — Short Wikidata description.
 * @property {string} thumbnail      — URL to thumbnail image (if any).
 * @property {string} url            — Full URL to the article.
 * @property {string} type           — Content type (standard, disambiguation, etc.)
 */
export async function getWikipediaSummary(title) {
  if (!title) return null;

  const encoded = encodeURIComponent(title.trim().replace(/\s+/g, '_'));

  try {
    const resp = await fetchWithTimeout(`${WIKI_SUMMARY_API}/${encoded}`);
    if (!resp.ok) return null;

    const data = await resp.json();

    return {
      title: data.title || title,
      extract: data.extract || '',
      extractHtml: data.extract_html || '',
      description: data.description || '',
      thumbnail: data.thumbnail?.source || null,
      url: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encoded}`,
      type: data.type || 'standard',
    };
  } catch (err) {
    console.warn('[webSearch] Wikipedia summary failed:', err.message);
    return null;
  }
}

/**
 * Full web research: search Wikipedia, then fetch summaries for top results.
 * Returns a combined, ready-to-render research package.
 *
 * @param {string} query — The user's search query.
 * @returns {Promise<WebResearchResult>}
 *
 * @typedef {object} WebResearchResult
 * @property {boolean}        found    — Whether any results were found.
 * @property {string}         query    — The original query.
 * @property {WikiSummary}    primary  — The best matching article summary.
 * @property {WikiSummary[]}  related  — Additional related article summaries.
 * @property {number}         fetchTime — Time in ms to complete the research.
 */
export async function researchTopic(query) {
  const start = performance.now();

  // Step 1: Search for matching articles
  const searchResults = await searchWikipedia(query, MAX_RESULTS + 1);

  if (searchResults.length === 0) {
    return {
      found: false,
      query,
      primary: null,
      related: [],
      fetchTime: Math.round(performance.now() - start),
    };
  }

  // Step 2: Fetch summary for the top result
  const primary = await getWikipediaSummary(searchResults[0].title);

  // Step 3: Fetch summaries for the remaining results in parallel
  const relatedPromises = searchResults.slice(1, MAX_RESULTS + 1).map((r) =>
    getWikipediaSummary(r.title)
  );
  const relatedResults = await Promise.all(relatedPromises);
  const related = relatedResults.filter(Boolean);

  return {
    found: !!primary,
    query,
    primary,
    related,
    fetchTime: Math.round(performance.now() - start),
  };
}

/**
 * Render a web research result into rich NEXUS-styled HTML.
 *
 * @param {WebResearchResult} result — The research result from `researchTopic`.
 * @returns {string} HTML string ready for the chat panel.
 */
export function renderWebResult(result) {
  if (!result.found || !result.primary) {
    return `
      <div class="research-section research-fallback">
        <h3>🌐 Web Search: ${result.query}</h3>
        <p>No results found on Wikipedia for <strong>${result.query}</strong>.
        Try rephrasing your question or using different keywords.</p>
      </div>`;
  }

  const p = result.primary;
  let html = '';

  // Header
  html += `
    <div class="research-section">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
        <span style="font-size:10px;padding:3px 10px;border-radius:20px;background:rgba(56,189,248,0.15);color:var(--accent-cyan);font-family:var(--font-mono);">🌐 WIKIPEDIA</span>
        <span style="font-size:10px;color:var(--text-tertiary);font-family:var(--font-mono);">fetched in ${result.fetchTime}ms</span>
      </div>
      <h3>📚 ${p.title}</h3>`;

  // Description badge
  if (p.description) {
    html += `<p style="color:var(--accent-cyan);font-style:italic;margin-bottom:12px;">${p.description}</p>`;
  }

  // Thumbnail + extract
  if (p.thumbnail) {
    html += `
      <div style="display:flex;gap:16px;margin-bottom:16px;">
        <img src="${p.thumbnail}" alt="${p.title}" style="width:120px;height:120px;object-fit:cover;border-radius:12px;border:1px solid var(--glass-border);flex-shrink:0;" />
        <div>${p.extractHtml || `<p>${p.extract}</p>`}</div>
      </div>`;
  } else {
    html += `<div style="margin-bottom:16px;">${p.extractHtml || `<p>${p.extract}</p>`}</div>`;
  }

  // Source link
  html += `
    <div style="margin-bottom:16px;">
      <a href="${p.url}" target="_blank" rel="noopener noreferrer"
         style="color:var(--accent-purple-light);font-size:12px;font-family:var(--font-mono);text-decoration:none;display:inline-flex;align-items:center;gap:4px;">
        📖 Read full article on Wikipedia →
      </a>
    </div>`;

  // Related articles
  if (result.related.length > 0) {
    html += `
      <div style="border-top:1px solid var(--glass-border);padding-top:16px;margin-top:8px;">
        <h4 style="font-size:13px;color:var(--text-secondary);margin-bottom:10px;">🔗 Related Articles</h4>
        <div style="display:flex;flex-direction:column;gap:10px;">`;

    for (const rel of result.related) {
      html += `
        <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:10px;padding:12px;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;">
            <strong style="color:var(--accent-purple-light);font-size:14px;">${rel.title}</strong>
            <a href="${rel.url}" target="_blank" rel="noopener noreferrer"
               style="color:var(--accent-cyan);font-size:10px;font-family:var(--font-mono);text-decoration:none;flex-shrink:0;">
              Open →
            </a>
          </div>
          ${rel.description ? `<p style="font-size:11px;color:var(--accent-cyan);margin:4px 0;">${rel.description}</p>` : ''}
          <p style="font-size:13px;color:var(--text-secondary);margin-top:6px;line-height:1.5;">
            ${rel.extract ? (rel.extract.length > 200 ? rel.extract.slice(0, 200) + '…' : rel.extract) : ''}
          </p>
        </div>`;
    }

    html += `</div></div>`;
  }

  html += `</div>`;
  return html;
}
