[**Auth Toolkit**](../README.md)

---

[Auth Toolkit](../globals.md) / NetworkError

# Class: NetworkError

Defined in:
[errors.ts:32](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/errors.ts#L32)

## Extends

- [`AuthError`](AuthError.md)

## Constructors

### Constructor

> **new NetworkError**(`message?`, `originalError?`): `NetworkError`

Defined in:
[errors.ts:33](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/errors.ts#L33)

#### Parameters

##### message?

`string` = `'Network request failed'`

##### originalError?

`unknown`

#### Returns

`NetworkError`

#### Overrides

[`AuthError`](AuthError.md).[`constructor`](AuthError.md#constructor)

## Properties

### code

> `readonly` **code**: `string`

Defined in:
[errors.ts:4](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/errors.ts#L4)

#### Inherited from

[`AuthError`](AuthError.md).[`code`](AuthError.md#code)

---

### statusCode?

> `readonly` `optional` **statusCode?**: `number`

Defined in:
[errors.ts:5](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/errors.ts#L5)

#### Inherited from

[`AuthError`](AuthError.md).[`statusCode`](AuthError.md#statuscode)

---

### originalError?

> `readonly` `optional` **originalError?**: `unknown`

Defined in:
[errors.ts:35](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/errors.ts#L35)
