[**Auth Toolkit**](../README.md)

---

[Auth Toolkit](../globals.md) / AuthManagerOptions

# Interface: AuthManagerOptions\<User\>

Defined in:
[AuthManager.ts:10](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/AuthManager.ts#L10)

## Type Parameters

### User

`User`

## Properties

### onRefresh?

> `optional` **onRefresh?**: (`currentAccessToken`) => `Promise`\<[`RefreshResult`](RefreshResult.md)\<`User`\>\>

Defined in:
[AuthManager.ts:11](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/AuthManager.ts#L11)

#### Parameters

##### currentAccessToken

`string` \| `null`

#### Returns

`Promise`\<[`RefreshResult`](RefreshResult.md)\<`User`\>\>
