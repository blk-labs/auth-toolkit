[**Auth Toolkit**](../README.md)

---

[Auth Toolkit](../globals.md) / WebStorageTokenStore

# Class: WebStorageTokenStore

Defined in:
[storage/WebStorageTokenStore.ts:16](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/storage/WebStorageTokenStore.ts#L16)

## Implements

- [`TokenStore`](../interfaces/TokenStore.md)

## Constructors

### Constructor

> **new WebStorageTokenStore**(`key?`, `storage?`): `WebStorageTokenStore`

Defined in:
[storage/WebStorageTokenStore.ts:18](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/storage/WebStorageTokenStore.ts#L18)

#### Parameters

##### key?

`string` = `'auth-toolkit.auth_token'`

##### storage?

`Storage`

#### Returns

`WebStorageTokenStore`

## Methods

### getAccessToken()

> **getAccessToken**(): `string` \| `null`

Defined in:
[storage/WebStorageTokenStore.ts:32](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/storage/WebStorageTokenStore.ts#L32)

#### Returns

`string` \| `null`

#### Implementation of

[`TokenStore`](../interfaces/TokenStore.md).[`getAccessToken`](../interfaces/TokenStore.md#getaccesstoken)

---

### setAccessToken()

> **setAccessToken**(`token`): `void`

Defined in:
[storage/WebStorageTokenStore.ts:41](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/storage/WebStorageTokenStore.ts#L41)

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
[storage/WebStorageTokenStore.ts:49](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/storage/WebStorageTokenStore.ts#L49)

#### Returns

`void`

#### Implementation of

[`TokenStore`](../interfaces/TokenStore.md).[`clear`](../interfaces/TokenStore.md#clear)
