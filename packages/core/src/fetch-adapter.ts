export interface FetchAdapter {
  (input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

export const defaultFetchAdapter: FetchAdapter = (input, init) => {
  if (typeof fetch === 'function') {
    return fetch(input, init);
  }
  throw new Error(
    'No fetch implementation found. Provide a fetchAdapter to createHttpClient or ensure global fetch is available (Node 18+, Cloudflare Workers, Bun, modern browsers).'
  );
};

export function createFetchAdapter(customFetch: FetchAdapter): FetchAdapter {
  return customFetch;
}
