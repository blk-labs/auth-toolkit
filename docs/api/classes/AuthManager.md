[**Auth Toolkit**](../README.md)

---

[Auth Toolkit](../globals.md) / AuthManager

# Class: AuthManager\<T\>

Defined in:
[AuthManager.ts:14](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/AuthManager.ts#L14)

## Type Parameters

### T

`T` = `unknown`

## Constructors

### Constructor

> **new AuthManager**\<`T`\>(`tokenStore`, `options?`): `AuthManager`\<`T`\>

Defined in:
[AuthManager.ts:23](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/AuthManager.ts#L23)

#### Parameters

##### tokenStore

[`TokenStore`](../interfaces/TokenStore.md)

##### options?

[`AuthManagerOptions`](../interfaces/AuthManagerOptions.md)\<`T`\> = `{}`

#### Returns

`AuthManager`\<`T`\>

## Methods

### getState()

> **getState**(): [`AuthState`](../interfaces/AuthState.md)\<`T`\>

Defined in:
[AuthManager.ts:35](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/AuthManager.ts#L35)

#### Returns

[`AuthState`](../interfaces/AuthState.md)\<`T`\>

---

### getTokenStore()

> **getTokenStore**(): [`TokenStore`](../interfaces/TokenStore.md)

Defined in:
[AuthManager.ts:39](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/AuthManager.ts#L39)

#### Returns

[`TokenStore`](../interfaces/TokenStore.md)

---

### subscribe()

> **subscribe**(`listener`): () => `void`

Defined in:
[AuthManager.ts:43](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/AuthManager.ts#L43)

#### Parameters

##### listener

[`AuthListener`](../type-aliases/AuthListener.md)\<`T`\>

#### Returns

() => `void`

---

### login()

> **login**(`user`, `token`): `Promise`\<`void`\>

Defined in:
[AuthManager.ts:60](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/AuthManager.ts#L60)

#### Parameters

##### user

`T`

##### token

`string`

#### Returns

`Promise`\<`void`\>

---

### logout()

> **logout**(): `void`

Defined in:
[AuthManager.ts:68](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/AuthManager.ts#L68)

#### Returns

`void`

---

### refresh()

> **refresh**(): `Promise`\<`string`\>

Defined in:
[AuthManager.ts:75](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/AuthManager.ts#L75)

#### Returns

`Promise`\<`string`\>

---

### updateToken()

> **updateToken**(`newToken`): `Promise`\<`void`\>

Defined in:
[AuthManager.ts:121](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/AuthManager.ts#L121)

#### Parameters

##### newToken

`string`

#### Returns

`Promise`\<`void`\>

---

### bootstrapAuth()

> **bootstrapAuth**(): `Promise`\<`void`\>

Defined in:
[AuthManager.ts:125](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/AuthManager.ts#L125)

#### Returns

`Promise`\<`void`\>

---

### storeReturnTo()

> **storeReturnTo**(`path`): `void`

Defined in:
[AuthManager.ts:146](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/AuthManager.ts#L146)

#### Parameters

##### path

`string`

#### Returns

`void`

---

### getReturnTo()

> **getReturnTo**(): `string`

Defined in:
[AuthManager.ts:150](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/AuthManager.ts#L150)

#### Returns

`string`

---

### consumeReturnTo()

> **consumeReturnTo**(): `string`

Defined in:
[AuthManager.ts:154](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/AuthManager.ts#L154)

#### Returns

`string`

---

### clearReturnTo()

> **clearReturnTo**(): `void`

Defined in:
[AuthManager.ts:158](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/AuthManager.ts#L158)

#### Returns

`void`
