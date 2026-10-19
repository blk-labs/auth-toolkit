import type { TokenStore } from "@auth/types";

export interface CookieTokenStoreOptions {
  name?: string;
  domain?: string;
  path?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

export class CookieTokenStore implements TokenStore {
  private options: Required<CookieTokenStoreOptions>;

  constructor(options: CookieTokenStoreOptions = {}) {
    this.options = {
      name: options.name ?? "auth_token",
      domain: options.domain ?? "",
      path: options.path ?? "/",
      secure: options.secure ?? true,
      sameSite: options.sameSite ?? "lax",
    };
  }

  getAccessToken(): string | null {
    if (typeof document === "undefined") return null;

    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, ...valueParts] = cookie.split("=");
      if (name === this.options.name) {
        return decodeURIComponent(valueParts.join("="));
      }
    }
    return null;
  }

  setAccessToken(token: string): void {
    if (typeof document === "undefined") return;

    const { name, domain, path, secure, sameSite } = this.options;
    const cookieParts = [
      `${name}=${encodeURIComponent(token)}`,
      `Path=${path}`,
      `SameSite=${sameSite}`,
    ];

    if (domain) {
      cookieParts.push(`Domain=${domain}`);
    }
    if (secure) {
      cookieParts.push("Secure");
    }

    document.cookie = cookieParts.join("; ");
  }

  clear(): void {
    if (typeof document === "undefined") return;

    const { name, domain, path } = this.options;
    const cookieParts = [
      `${name}=`,
      `Path=${path}`,
      "Expires=Thu, 01 Jan 1970 00:00:00 GMT",
    ];

    if (domain) {
      cookieParts.push(`Domain=${domain}`);
    }

    document.cookie = cookieParts.join("; ");
  }
}