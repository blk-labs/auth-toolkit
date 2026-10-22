[**Auth Toolkit**](../README.md)

---

[Auth Toolkit](../globals.md) / RetryConfig

# Interface: RetryConfig

Defined in:
[https.ts:15](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/https.ts#L15)

## Properties

### maxRetries

> **maxRetries**: `number`

Defined in:
[https.ts:16](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/https.ts#L16)

---

### retryDelay?

> `optional` **retryDelay?**: (`attempt`) => `number`

Defined in:
[https.ts:17](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/https.ts#L17)

#### Parameters

##### attempt

`number`

#### Returns

`number`

---

### retryCondition?

> `optional` **retryCondition?**: (`error`) => `boolean`

Defined in:
[https.ts:18](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/https.ts#L18)

#### Parameters

##### error

`unknown`

#### Returns

`boolean`
