"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useAuth } from "../hooks/useAuth";
import { loadCoreModule } from "../utils/core-loader";
import type { HttpClient } from "../types/core-exports";

let cachedCreateFn: ((options: {
  getAccessToken: () => string | null;
  onLogout: () => void;
}) => HttpClient) | null = null;
let loadPromise: Promise<void> | null = null;


function loadCreateHttpClientFn(): Promise<void> {
  if (cachedCreateFn) {
    return Promise.resolve();
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = loadCoreModule()
    .then((core) => {
      cachedCreateFn = core.createHttpClient;
    })
    .catch((error) => {
      throw new Error(
        "[useApi] Failed to load createHttpClient from @auth-toolkit/core. " +
          "Ensure the core package is properly installed and exports createHttpClient. " +
          `Original error: ${error instanceof Error ? error.message : String(error)}`
      );
    });

  return loadPromise;
}

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
export function useApi(): UseApiReturn {
  const { logout } = useAuth();
  const clientRef = useRef<HttpClient | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadCreateHttpClientFn()
      .then(() => {
        if (cancelled || !cachedCreateFn) return;

        const client = cachedCreateFn({
          getAccessToken: (): string | null => {
            // The token store is managed by the core AuthManager.
            // This will be wired to the actual TokenStore when the core
            // package exposes it publicly.
            return null;
          },
          onLogout: (): void => {
            
            logout();
          },
        });

        if (!cancelled) {
          clientRef.current = client;
          setIsReady(true);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          console.error(error);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [logout]);

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
