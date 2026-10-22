[**Auth Toolkit**](../README.md)

---

[Auth Toolkit](../globals.md) / HttpClient

# Class: HttpClient

Defined in:
[https.ts:37](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/https.ts#L37)

## Constructors

### Constructor

> **new HttpClient**(`config`): `HttpClient`

Defined in:
[https.ts:44](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/https.ts#L44)

#### Parameters

##### config

`HttpClientConfig`

#### Returns

`HttpClient`

## Methods

### addRequestInterceptor()

> **addRequestInterceptor**(`interceptor`): () => `void`

Defined in:
[https.ts:54](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/https.ts#L54)

#### Parameters

##### interceptor

[`RequestInterceptor`](../interfaces/RequestInterceptor.md)

#### Returns

() => `void`

---

### addResponseInterceptor()

> **addResponseInterceptor**(`interceptor`): () => `void`

Defined in:
[https.ts:62](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/https.ts#L62)

#### Parameters

##### interceptor

[`ResponseInterceptor`](../interfaces/ResponseInterceptor.md)

#### Returns

() => `void`

---

### setRetryConfig()

> **setRetryConfig**(`config`): `void`

Defined in:
[https.ts:70](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/https.ts#L70)

#### Parameters

##### config

[`RetryConfig`](../interfaces/RetryConfig.md) \| `null`

#### Returns

`void`

---

### request()

> **request**(`path`, `options?`): `Promise`\<`Response`\>

Defined in:
[https.ts:102](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/https.ts#L102)

#### Parameters

##### path

`string`

##### options?

`RequestInit` = `{}`

#### Returns

`Promise`\<`Response`\>

---

### get()

> **get**(`url`, `config?`): `Promise`\<`Response`\>

Defined in:
[https.ts:198](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/https.ts#L198)

#### Parameters

##### url

`string`

##### config?

`RequestInit`

#### Returns

`Promise`\<`Response`\>

---

### post()

> **post**(`url`, `body?`, `config?`): `Promise`\<`Response`\>

Defined in:
[https.ts:202](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/https.ts#L202)

#### Parameters

##### url

`string`

##### body?

`unknown`

##### config?

`RequestInit`

#### Returns

`Promise`\<`Response`\>

---

### put()

> **put**(`url`, `body?`, `config?`): `Promise`\<`Response`\>

Defined in:
[https.ts:215](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/https.ts#L215)

#### Parameters

##### url

`string`

##### body?

`unknown`

##### config?

`RequestInit`

#### Returns

`Promise`\<`Response`\>

---

### patch()

> **patch**(`url`, `body?`, `config?`): `Promise`\<`Response`\>

Defined in:
[https.ts:228](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/https.ts#L228)

#### Parameters

##### url

`string`

##### body?

`unknown`

##### config?

`RequestInit`

#### Returns

`Promise`\<`Response`\>

---

### del()

> **del**(`url`, `config?`): `Promise`\<`Response`\>

Defined in:
[https.ts:241](https://github.com/blk-labs/auth-toolkit/blob/e892e2dbad5d7d426e8b2c27f19da0867e907216/packages/core/src/https.ts#L241)

#### Parameters

##### url

`string`

##### config?

`RequestInit`

#### Returns

`Promise`\<`Response`\>
