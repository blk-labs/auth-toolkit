"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useAuth } from "../hooks/useAuth";
import { createHttpClient, type HttpClient } from "@auth-toolkit/core";

export interface UseApiReturn {
  get: HttpClient["get"];
  post: HttpClient["post"];
  put: HttpClient["put"];
  del: HttpClient["del"];
  isReady: boolean;
}

/**
 * useApi Hook
 *
 * A thin React wrapper around the createHttpClient() from @auth-toolkit/core.
 * Automatically attaches the access token to requests and handles logout on failure.
 *
 * The HTTP client instance is stable across renders (memoized with useRef).
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { get, post, isReady } = useApi();
 *
 *   const fetchData = async () => {
 *     if (!isReady) return;
 *     const data = await get('/api/data');
 *     console.log(data);
 *   };
 *
 *   const submitData = async () => {
 *     if (!isReady) return;
 *     await post('/api/submit', { name: 'test' });
 *   };
 *
 *   // ...
 * }
 * ```
 */
export function useApi(baseUrl: string): UseApiReturn {
  const { logout, getTokenStore, refresh } = useAuth();
  const clientRef = useRef<HttpClient | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const tokenStore = getTokenStore();
    if (!tokenStore) {
      return;
    }

    const client = createHttpClient({
      baseUrl,
      storage: tokenStore,
      onRefresh: () => refresh(),
      onLogout: () => logout(),
    });

    if (!cancelled) {
      clientRef.current = client;
      setIsReady(true);
    }

    return () => {
      cancelled = true;
    };
  }, [baseUrl, logout, getTokenStore, refresh]);

  const get = useCallback<HttpClient["get"]>(
    (url: string, config?: RequestInit) => {
      if (!clientRef.current) {
        return Promise.reject(
          new Error("[useApi] HTTP client is not ready yet.")
        );
      }
      return clientRef.current.get(url, config);
    },
    []
  );

  const post = useCallback<HttpClient["post"]>(
    (url: string, body?: unknown, config?: RequestInit) => {
      if (!clientRef.current) {
        return Promise.reject(
          new Error("[useApi] HTTP client is not ready yet.")
        );
      }
      return clientRef.current.post(url, body, config);
    },
    []
  );

  const put = useCallback<HttpClient["put"]>(
    (url: string, body?: unknown, config?: RequestInit) => {
      if (!clientRef.current) {
        return Promise.reject(
          new Error("[useApi] HTTP client is not ready yet.")
        );
      }
      return clientRef.current.put(url, body, config);
    },
    []
  );

  const del = useCallback<HttpClient["del"]>(
    (url: string, config?: RequestInit) => {
      if (!clientRef.current) {
        return Promise.reject(
          new Error("[useApi] HTTP client is not ready yet.")
        );
      }
      return clientRef.current.del(url, config);
    },
    []
  );

  return {
    get,
    post,
    put,
    del,
    isReady,
  };
}

export type { HttpClient };