[**Auth Toolkit**](../README.md)

---

[Auth Toolkit](../globals.md) / SessionStorageTokenStore

# Class: SessionStorageTokenStore

Defined in:
[storage/SessionStorageTokenStore.ts:17](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/storage/SessionStorageTokenStore.ts#L17)

## Implements

- [`TokenStore`](../interfaces/TokenStore.md)

## Constructors

### Constructor

> **new SessionStorageTokenStore**(`key?`, `storage?`): `SessionStorageTokenStore`

Defined in:
[storage/SessionStorageTokenStore.ts:19](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/storage/SessionStorageTokenStore.ts#L19)

#### Parameters

##### key?

`string` = `'auth-toolkit.auth_token'`

##### storage?

`Storage`

#### Returns

`SessionStorageTokenStore`

## Methods

### getAccessToken()

> **getAccessToken**(): `string` \| `null`

Defined in:
[storage/SessionStorageTokenStore.ts:33](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/storage/SessionStorageTokenStore.ts#L33)

#### Returns

`string` \| `null`

#### Implementation of

[`TokenStore`](../interfaces/TokenStore.md).[`getAccessToken`](../interfaces/TokenStore.md#getaccesstoken)

---

### setAccessToken()

> **setAccessToken**(`token`): `void`

Defined in:
[storage/SessionStorageTokenStore.ts:42](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/storage/SessionStorageTokenStore.ts#L42)

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
[storage/SessionStorageTokenStore.ts:50](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/storage/SessionStorageTokenStore.ts#L50)

#### Returns

`void`

#### Implementation of

[`TokenStore`](../interfaces/TokenStore.md).[`clear`](../interfaces/TokenStore.md#clear)
