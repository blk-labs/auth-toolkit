[**Auth Toolkit**](../README.md)

---

[Auth Toolkit](../globals.md) / MemoryTokenStore

# Class: MemoryTokenStore

Defined in:
[storage/MemoryTokenStore.ts:3](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/storage/MemoryTokenStore.ts#L3)

## Implements

- [`TokenStore`](../interfaces/TokenStore.md)

## Constructors

### Constructor

> **new MemoryTokenStore**(): `MemoryTokenStore`

#### Returns

`MemoryTokenStore`

## Methods

### getAccessToken()

> **getAccessToken**(): `string` \| `null`

Defined in:
[storage/MemoryTokenStore.ts:6](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/storage/MemoryTokenStore.ts#L6)

#### Returns

`string` \| `null`

#### Implementation of

[`TokenStore`](../interfaces/TokenStore.md).[`getAccessToken`](../interfaces/TokenStore.md#getaccesstoken)

---

### setAccessToken()

> **setAccessToken**(`token`): `void`

Defined in:
[storage/MemoryTokenStore.ts:10](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/storage/MemoryTokenStore.ts#L10)

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
[storage/MemoryTokenStore.ts:14](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/storage/MemoryTokenStore.ts#L14)

#### Returns

`void`

#### Implementation of

[`TokenStore`](../interfaces/TokenStore.md).[`clear`](../interfaces/TokenStore.md#clear)
