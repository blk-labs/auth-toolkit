[**Auth Toolkit**](../README.md)

---

[Auth Toolkit](../globals.md) / TokenExpiredError

# Class: TokenExpiredError

Defined in:
[errors.ts:15](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/errors.ts#L15)

## Extends

- [`AuthError`](AuthError.md)

## Constructors

### Constructor

> **new TokenExpiredError**(`message?`): `TokenExpiredError`

Defined in:
[errors.ts:16](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/errors.ts#L16)

#### Parameters

##### message?

`string` = `'Access token has expired'`

#### Returns

`TokenExpiredError`

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
