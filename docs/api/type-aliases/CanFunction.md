[**Auth Toolkit**](../README.md)

---

[Auth Toolkit](../globals.md) / CanFunction

# Type Alias: CanFunction

> **CanFunction** = (`user`, `action`, `resource`, `resolver?`) => `boolean`

Defined in:
[types/rbac.ts:8](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/types/rbac.ts#L8)

## Parameters

### user

[`AuthUser`](../interfaces/AuthUser.md) \| `null`

### action

`string`

### resource

`string`

### resolver?

(`user`, `action`, `resource`) => `boolean`

## Returns

`boolean`
