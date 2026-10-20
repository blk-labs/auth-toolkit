[**Auth Toolkit**](../README.md)

---

[Auth Toolkit](../globals.md) / AuthError

# Class: AuthError

Defined in:
[errors.ts:1](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/errors.ts#L1)

## Extends

- `Error`

## Extended by

- [`TokenExpiredError`](TokenExpiredError.md)
- [`RefreshFailedError`](RefreshFailedError.md)
- [`NetworkError`](NetworkError.md)
- [`UnauthorizedError`](UnauthorizedError.md)
- [`ForbiddenError`](ForbiddenError.md)
- [`ConfigurationError`](ConfigurationError.md)

## Constructors

### Constructor

> **new AuthError**(`message`, `code`, `statusCode?`): `AuthError`

Defined in:
[errors.ts:2](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/errors.ts#L2)

#### Parameters

##### message

`string`

##### code

`string`

##### statusCode?

`number`

#### Returns

`AuthError`

#### Overrides

`Error.constructor`

## Properties

### code

> `readonly` **code**: `string`

Defined in:
[errors.ts:4](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/errors.ts#L4)

---

### statusCode?

> `readonly` `optional` **statusCode?**: `number`

Defined in:
[errors.ts:5](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/errors.ts#L5)
