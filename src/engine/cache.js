/**
 * @fileoverview NEXUS Response Cache Engine
 * Map-based caching system with TTL expiration, hit/miss tracking,
 * and token savings estimation. Pure computation — no external deps.
 * @module engine/cache
 */

// ─── Constants ───────────────────────────────────────────────────────────────

/** Default time-to-live: 24 hours in milliseconds. */
const DEFAULT_TTL = 24 * 60 * 60 * 1000;

// ─── Cache Entry Shape ───────────────────────────────────────────────────────

/**
 * @typedef {Object} CacheEntry
 * @property {*}      response       — The cached response payload.
 * @property {number} tokenEstimate  — Estimated tokens this response would cost.
 * @property {number} createdAt      — Epoch ms when the entry was stored.
 * @property {number} ttl            — Time-to-live in ms for this entry.
 * @property {number} hits           — Number of times this entry has been read.
 */

/**
 * @typedef {Object} CacheInstance
 * @property {Map<string, CacheEntry>} store     — The underlying Map store.
 * @property {number}                  hitCount  — Total cache hits across all keys.
 * @property {number}                  missCount — Total cache misses across all keys.
 * @property {number}                  tokensSaved — Running total of tokens saved via hits.
 */

// ─── Cache Factory ───────────────────────────────────────────────────────────

/**
 * Create a new cache instance.
 *
 * Returns a plain object wrapping a Map with aggregate counters.
 * All cache operations accept this instance as their first argument.
 *
 * @returns {CacheInstance} A fresh, empty cache.
 * @example
 * const cache = createCache();
 * set(cache, 'agent:topic', { text: 'answer' }, 150);
 */
export function createCache() {
  return {
    store: new Map(),
    hitCount: 0,
    missCount: 0,
    tokensSaved: 0
  };
}

// ─── Key Generation ──────────────────────────────────────────────────────────

/**
 * Generate a normalized cache key from an agent ID and topic.
 *
 * Normalization: `agentId + ':' + topic.toLowerCase()
 *   .replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, '_')`
 *
 * @param {string} agentId — The agent identifier (e.g. 'explainer', 'quizzer').
 * @param {string} topic — The topic string to cache against.
 * @returns {string} A deterministic, URL-safe cache key.
 * @example
 * generateKey('explainer', 'Machine Learning!') // 'explainer:machine_learning'
 * generateKey('quiz', 'What is OOP?')           // 'quiz:what_is_oop'
 */
export function generateKey(agentId, topic) {
  const normalizedTopic = (topic || '')
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, '_');

  return `${agentId}:${normalizedTopic}`;
}

// ─── Cache Operations ────────────────────────────────────────────────────────

/**
 * Retrieve a value from the cache.
 *
 * Returns `null` on miss or if the entry has expired. Expired entries are
 * lazily evicted on access. On hit, increments both per-entry and global
 * hit counters and accumulates token savings.
 *
 * @param {CacheInstance} cache — The cache instance.
 * @param {string} key — The cache key (use {@link generateKey} to create).
 * @returns {*|null} The cached response, or `null` if not found / expired.
 * @example
 * const result = get(cache, 'explainer:physics');
 * if (result) console.log('Cache hit:', result);
 */
export function get(cache, key) {
  const entry = cache.store.get(key);

  if (!entry) {
    cache.missCount++;
    return null;
  }

  // Check TTL
  const age = Date.now() - entry.createdAt;
  if (age > entry.ttl) {
    // Expired — evict lazily
    cache.store.delete(key);
    cache.missCount++;
    return null;
  }

  // Cache hit
  entry.hits++;
  cache.hitCount++;
  cache.tokensSaved += entry.tokenEstimate;

  return entry.response;
}

/**
 * Store a value in the cache.
 *
 * @param {CacheInstance} cache — The cache instance.
 * @param {string} key — The cache key.
 * @param {*} response — The response payload to cache.
 * @param {number} [tokenEstimate=0] — Estimated tokens this response costs to generate.
 *   Used for calculating savings on future hits.
 * @param {number} [ttl=DEFAULT_TTL] — Time-to-live in milliseconds.
 *   Defaults to 24 hours.
 * @returns {void}
 * @example
 * set(cache, 'explainer:physics', { text: 'Physics is...' }, 200, 3600000);
 */
export function set(cache, key, response, tokenEstimate = 0, ttl = DEFAULT_TTL) {
  cache.store.set(key, {
    response,
    tokenEstimate,
    createdAt: Date.now(),
    ttl,
    hits: 0
  });
}

// ─── Cache Maintenance ───────────────────────────────────────────────────────

/**
 * Remove all expired entries from the cache.
 *
 * Iterates over every entry and deletes those whose age exceeds their TTL.
 * Call periodically or before reporting stats for accurate counts.
 *
 * @param {CacheInstance} cache — The cache instance.
 * @returns {number} The number of entries evicted.
 * @example
 * const evicted = clearExpired(cache);
 * console.log(`Cleaned up ${evicted} stale entries`);
 */
export function clearExpired(cache) {
  const now = Date.now();
  let evicted = 0;

  for (const [key, entry] of cache.store) {
    if (now - entry.createdAt > entry.ttl) {
      cache.store.delete(key);
      evicted++;
    }
  }

  return evicted;
}

/**
 * Flush the entire cache, resetting all counters.
 *
 * @param {CacheInstance} cache — The cache instance.
 * @returns {void}
 * @example
 * clearAll(cache);
 * // cache is now empty, all counters reset
 */
export function clearAll(cache) {
  cache.store.clear();
  cache.hitCount = 0;
  cache.missCount = 0;
  cache.tokensSaved = 0;
}

// ─── Cache Statistics ────────────────────────────────────────────────────────

/**
 * Get aggregate cache statistics.
 *
 * @param {CacheInstance} cache — The cache instance.
 * @returns {{
 *   totalEntries: number,
 *   hitCount: number,
 *   missCount: number,
 *   hitRate: number,
 *   tokensSaved: number
 * }}
 *   totalEntries — Number of entries currently in cache (including expired).
 *   hitCount     — Total successful retrievals.
 *   missCount    — Total misses (not found + expired).
 *   hitRate      — hitCount / (hitCount + missCount), or 0 if no lookups.
 *   tokensSaved  — Estimated total tokens saved by cache hits.
 * @example
 * const stats = getCacheStats(cache);
 * console.log(`Hit rate: ${(stats.hitRate * 100).toFixed(1)}%`);
 */
export function getCacheStats(cache) {
  const total = cache.hitCount + cache.missCount;

  return {
    totalEntries: cache.store.size,
    hitCount: cache.hitCount,
    missCount: cache.missCount,
    hitRate: total > 0 ? parseFloat((cache.hitCount / total).toFixed(4)) : 0,
    tokensSaved: cache.tokensSaved
  };
}
