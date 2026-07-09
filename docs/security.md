# Security

This authentication toolkit provides flexible token storage adapters. Each storage strategy has different security implications.

---

## Threat Model (XSS)

This library assumes the primary browser threat is **Cross-Site Scripting (XSS)**.

If XSS is present, any JavaScript-accessible storage (e.g. `localStorage`, `sessionStorage`) may be compromised.

---

## Storage Security Characteristics

### WebStorageTokenStore (localStorage / sessionStorage)

- Persistent across sessions
- Accessible via JavaScript
- Vulnerable to XSS attacks

**Risk:** High

---

### MemoryTokenStore

- Stored only in runtime memory
- Not persisted across refresh or tab close
- Not accessible after page reload

**Risk:** Low (no persistent token exposure)

---

## Recommended Usage

### Production (recommended pattern)

- Store **access tokens in memory**
- Store **refresh tokens in HttpOnly cookies**
- Use short-lived access tokens

---

## Important Notes

- This library does not enforce a single storage strategy
- Security depends on the storage implementation used
- Developers are responsible for selecting the appropriate strategy for their application