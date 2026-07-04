import { useCallback, useEffect, useRef, useState } from 'react';
import { NISAB_PRICES } from '../mock/mockData';

const TROY_OZ_TO_GRAM = 31.1034768;

// Free, keyless, CORS-enabled endpoints
const GOLD_URL = 'https://api.gold-api.com/price/XAU';
const SILVER_URL = 'https://api.gold-api.com/price/XAG';
const FX_URL = 'https://open.er-api.com/v6/latest/USD';

const REFRESH_MS = 10 * 60 * 1000; // 10 minutes
const CACHE_KEY = 'zc_live_prices_v1';
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

async function fetchJson(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.json();
}

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.ts > CACHE_TTL) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(payload) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    /* ignore */
  }
}

/**
 * Fetches live spot gold + silver (USD/oz) and FX rates,
 * computes per-gram prices in every supported currency.
 * Falls back to static NISAB_PRICES if the network fails.
 */
export default function useLivePrices() {
  const [state, setState] = useState(() => {
    const cached = readCache();
    if (cached) {
      return {
        pricesByCurrency: cached.pricesByCurrency,
        goldUsdOz: cached.goldUsdOz,
        silverUsdOz: cached.silverUsdOz,
        rates: cached.rates,
        updatedAt: cached.ts,
        status: 'cached',
        error: null,
      };
    }
    return {
      pricesByCurrency: NISAB_PRICES,
      goldUsdOz: null,
      silverUsdOz: null,
      rates: null,
      updatedAt: null,
      status: 'idle',
      error: null,
    };
  });

  const abortRef = useRef(null);

  const load = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setState((s) => ({ ...s, status: 'loading', error: null }));

    try {
      const [gold, silver, fx] = await Promise.all([
        fetchJson(GOLD_URL, ctrl.signal),
        fetchJson(SILVER_URL, ctrl.signal),
        fetchJson(FX_URL, ctrl.signal),
      ]);

      // gold-api.com returns { price: number, ... } — price is USD per troy oz
      const goldUsdOz = Number(gold.price || gold.Price || 0);
      const silverUsdOz = Number(silver.price || silver.Price || 0);
      const rates = fx?.rates || {};

      if (!goldUsdOz || !silverUsdOz || !Object.keys(rates).length) {
        throw new Error('empty response');
      }

      const goldUsdGram = goldUsdOz / TROY_OZ_TO_GRAM;
      const silverUsdGram = silverUsdOz / TROY_OZ_TO_GRAM;

      const pricesByCurrency = {};
      Object.keys(NISAB_PRICES).forEach((code) => {
        const rate = code === 'USD' ? 1 : Number(rates[code] || 0);
        if (!rate) {
          // fall back to static if FX rate for currency missing
          pricesByCurrency[code] = NISAB_PRICES[code];
          return;
        }
        pricesByCurrency[code] = {
          gold24: Math.round(goldUsdGram * rate * 100) / 100,
          silver999: Math.round(silverUsdGram * rate * 1000) / 1000,
        };
      });

      const payload = {
        pricesByCurrency,
        goldUsdOz,
        silverUsdOz,
        rates,
        ts: Date.now(),
      };
      writeCache(payload);
      setState({
        pricesByCurrency,
        goldUsdOz,
        silverUsdOz,
        rates,
        updatedAt: payload.ts,
        status: 'live',
        error: null,
      });
    } catch (e) {
      if (e.name === 'AbortError') return;
      setState((s) => ({
        ...s,
        status: s.pricesByCurrency ? s.status : 'fallback',
        error: e.message || 'fetch failed',
      }));
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, REFRESH_MS);
    return () => {
      clearInterval(id);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [load]);

  return { ...state, refresh: load };
}
