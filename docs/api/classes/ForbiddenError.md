[**Auth Toolkit**](../README.md)

---

[Auth Toolkit](../globals.md) / ForbiddenError

# Class: ForbiddenError

Defined in:
[errors.ts:49](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/errors.ts#L49)

## Extends

- [`AuthError`](AuthError.md)

## Constructors

### Constructor

> **new ForbiddenError**(`message?`): `ForbiddenError`

Defined in:
[errors.ts:50](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/errors.ts#L50)

#### Parameters

##### message?

`string` = `'Forbidden'`

#### Returns

`ForbiddenError`

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
