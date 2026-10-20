[**Auth Toolkit**](../README.md)

---

[Auth Toolkit](../globals.md) / CookieTokenStore

# Class: CookieTokenStore

Defined in:
[storage/CookieTokenStore.ts:11](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/storage/CookieTokenStore.ts#L11)

## Implements

- [`TokenStore`](../interfaces/TokenStore.md)

## Constructors

### Constructor

> **new CookieTokenStore**(`options?`): `CookieTokenStore`

Defined in:
[storage/CookieTokenStore.ts:14](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/storage/CookieTokenStore.ts#L14)

#### Parameters

##### options?

[`CookieTokenStoreOptions`](../interfaces/CookieTokenStoreOptions.md) = `{}`

#### Returns

`CookieTokenStore`

## Methods

### getAccessToken()

> **getAccessToken**(): `string` \| `null`

Defined in:
[storage/CookieTokenStore.ts:24](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/storage/CookieTokenStore.ts#L24)

#### Returns

`string` \| `null`

#### Implementation of

[`TokenStore`](../interfaces/TokenStore.md).[`getAccessToken`](../interfaces/TokenStore.md#getaccesstoken)

---

### setAccessToken()

> **setAccessToken**(`token`): `void`

Defined in:
[storage/CookieTokenStore.ts:37](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/storage/CookieTokenStore.ts#L37)

#### Parameters

##### token

`string`

#### Returns

`void`

#### Implementation of

[`TokenStore`](../interfaces/TokenStore.md).[`setAccessToken`](../interfaces/TokenStore.md#setaccesstoken)

---

### clear()

> **clear**(): `void`

Defined in:
[storage/CookieTokenStore.ts:57](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/storage/CookieTokenStore.ts#L57)

#### Returns

`void`

#### Implementation of

[`TokenStore`](../interfaces/TokenStore.md).[`clear`](../interfaces/TokenStore.md#clear)
