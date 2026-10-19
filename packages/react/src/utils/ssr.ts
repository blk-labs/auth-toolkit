import { type AuthManager, type TokenStore, type AuthState } from "@auth-toolkit/core";

/**
 * SSR Auth Utilities
 *
 * Provides server-side authentication utilities for React SSR frameworks
 * (e.g. Remix, custom Express setups). For Next.js support, wire up
 * createServerAuth manually with your cookie adapter.
 */

export interface ServerAuthResult<User = unknown> {
  user: User | null;
  status: AuthState<User>["status"];
  accessToken: string | null;
}



/**
 * Creates a server-side auth helper that can read auth state from cookies/headers
 * without requiring a full React context.
 *
 * @example
 * ```typescript
 * // Next.js App Router - server component
 * import { createServerAuth } from "@blk-auth-toolkit/react/ssr";
 * 
 * const serverAuth = createServerAuth(authManager, cookieStore);
 * 
 * export default async function Page() {
 *   const { user, status } = await serverAuth.getAuth();
 *   // ...
 * }
 * ```
 */
export function createServerAuth<User = unknown>(
  authManager: AuthManager<User>,
  getCookie: (name: string) => string | undefined
) {
  return {
    /**
     * Gets the current auth state from server-side cookies/headers
     */
    async getAuth(): Promise<ServerAuthResult<User>> {
      // Try to get token from cookie
      const token = getCookie("auth_token") ?? authManager.getTokenStore().getAccessToken();
      
      if (!token) {
        return { user: null, status: "unauthenticated", accessToken: null };
      }

      // Temporarily set token on manager to bootstrap
      const originalToken = authManager.getTokenStore().getAccessToken();
      authManager.getTokenStore().setAccessToken(token);
      
      try {
        await authManager.bootstrapAuth();
        const state = authManager.getState();
        return {
          user: state.user,
          status: state.status,
          accessToken: token,
        };
      } catch {
        return { user: null, status: "unauthenticated", accessToken: null };
      } finally {
        // Restore original token
        if (originalToken) {
          authManager.getTokenStore().setAccessToken(originalToken);
        } else {
          authManager.getTokenStore().clear();
        }
      }
    },

    /**
     * Checks if the user is authenticated on the server
     */
    async isAuthenticated(): Promise<boolean> {
      const { status } = await this.getAuth();
      return status === "authenticated";
    },

    /**
     * Requires authentication - throws redirect if not authenticated
     * Use in server components to protect pages
     */
    async requireAuth(redirectTo = "/login"): Promise<ServerAuthResult<User>> {
      const auth = await this.getAuth();
      if (auth.status !== "authenticated" || !auth.user) {
        // In Next.js, you'd use redirect() from 'next/navigation'
        // This is a generic version - framework-specific implementations below
        throw new Error(`REDIRECT:${redirectTo}`);
      }
      return auth;
    },
  };
}



/**
 * Creates a middleware function for Next.js App Router
 * 
 * @example
 * ```typescript
 * // middleware.ts
 * import { createAuthMiddleware } from "@blk-auth-toolkit/react/ssr";
 * import { authManager } from "./lib/auth";
 * 
 * export default createAuthMiddleware(authManager, {
 *   protectedPaths: ["/dashboard", "/admin"],
 *   publicPaths: ["/login", "/register"],
 * });
 * 
 * export const config = {
 *   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
 * };
 * ```
 */
export interface AuthMiddlewareOptions {
  protectedPaths?: string[];
  publicPaths?: string[];
  loginPath?: string;
}

export function createAuthMiddleware<User = unknown>(
  authManager: AuthManager<User>,
  options: AuthMiddlewareOptions = {}
) {
  const { protectedPaths = [], publicPaths = [], loginPath = "/login" } = options;

  return async function authMiddleware(request: Request, next: () => Promise<Response>): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Skip public paths
    if (publicPaths.some((p) => path.startsWith(p))) {
      return next();
    }

    // Check if path is protected
    const isProtected = protectedPaths.some((p) => path.startsWith(p));
    
    if (!isProtected) {
      return next();
    }

    // Get token from cookie
    const cookieHeader = request.headers.get("cookie");
    let token: string | null = null;
    
    if (cookieHeader) {
      const cookies = cookieHeader.split("; ").reduce((acc, cookie) => {
        const [key, ...valueParts] = cookie.split("=");
        acc[key] = valueParts.join("=");
        return acc;
      }, {} as Record<string, string>);
      token = cookies["auth_token"] ?? null;
    }

    if (!token) {
      // Redirect to login
      const redirectUrl = new URL(loginPath, request.url);
      redirectUrl.searchParams.set("redirect", path);
      return Response.redirect(redirectUrl, 302);
    }

    // Verify token by bootstrapping auth
    const originalToken = authManager.getTokenStore().getAccessToken();
    authManager.getTokenStore().setAccessToken(token);
    
    try {
      await authManager.bootstrapAuth();
      const state = authManager.getState();
      
      if (state.status !== "authenticated" || !state.user) {
        const redirectUrl = new URL(loginPath, request.url);
        redirectUrl.searchParams.set("redirect", path);
        return Response.redirect(redirectUrl, 302);
      }

      // Add user info to request headers for downstream use
      const user = state.user as unknown as { id: string; roles?: string[] };
      const response = await next();
      response.headers.set("x-auth-user-id", user.id);
      if (user.roles) {
        response.headers.set("x-auth-user-roles", user.roles.join(","));
      }
      return response;
    } catch {
      const redirectUrl = new URL(loginPath, request.url);
      redirectUrl.searchParams.set("redirect", path);
      return Response.redirect(redirectUrl, 302);
    } finally {
      if (originalToken) {
        authManager.getTokenStore().setAccessToken(originalToken);
      } else {
        authManager.getTokenStore().clear();
      }
    }
  };
}

/**
 * Helper to get auth token from request cookies
 */
export function getTokenFromRequest(request: Request): string | null {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;
  
  const cookies = cookieHeader.split("; ").reduce((acc, cookie) => {
    const [key, ...valueParts] = cookie.split("=");
    acc[key] = valueParts.join("=");
    return acc;
  }, {} as Record<string, string>);
  
  return cookies["auth_token"] ?? null;
}

/**
 * Helper to set auth cookie on response
 */
export function setAuthCookie(
  response: Response,
  token: string,
  options: { maxAge?: number; secure?: boolean; sameSite?: "strict" | "lax" | "none" } = {}
): void {
  const { maxAge = 60 * 60 * 24 * 7, secure = true, sameSite = "lax" } = options;
  response.headers.append(
    "Set-Cookie",
    `auth_token=${token}; Path=/; HttpOnly; Secure=${secure}; SameSite=${sameSite}; Max-Age=${maxAge}`
  );
}

/**
 * Helper to clear auth cookie on response
 */
export function clearAuthCookie(response: Response): void {
  response.headers.append(
    "Set-Cookie",
    `auth_token=; Path=/; HttpOnly; Secure=true; SameSite=lax; Max-Age=0`
  );
}