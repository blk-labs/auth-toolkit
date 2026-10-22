[**Auth Toolkit**](README.md)

---

# Auth Toolkit

## Classes

- [AuthManager](classes/AuthManager.md)
- [AuthError](classes/AuthError.md)
- [TokenExpiredError](classes/TokenExpiredError.md)
- [RefreshFailedError](classes/RefreshFailedError.md)
- [NetworkError](classes/NetworkError.md)
- [UnauthorizedError](classes/UnauthorizedError.md)
- [ForbiddenError](classes/ForbiddenError.md)
- [ConfigurationError](classes/ConfigurationError.md)
- [HttpClient](classes/HttpClient.md)
- [CookieTokenStore](classes/CookieTokenStore.md)
- [MemoryTokenStore](classes/MemoryTokenStore.md)
- [SessionStorageTokenStore](classes/SessionStorageTokenStore.md)
- [WebStorageTokenStore](classes/WebStorageTokenStore.md)

## Interfaces

- [RefreshResult](interfaces/RefreshResult.md)
- [AuthManagerOptions](interfaces/AuthManagerOptions.md)
- [FetchAdapter](interfaces/FetchAdapter.md)
- [RequestInterceptor](interfaces/RequestInterceptor.md)
- [ResponseInterceptor](interfaces/ResponseInterceptor.md)
- [RetryConfig](interfaces/RetryConfig.md)
- [CookieTokenStoreOptions](interfaces/CookieTokenStoreOptions.md)
- [AuthState](interfaces/AuthState.md)
- [AuthUser](interfaces/AuthUser.md)
- [TokenStore](interfaces/TokenStore.md)

## Functions

- [isAuthError](functions/isAuthError.md)
- [getAuthErrorCode](functions/getAuthErrorCode.md)
- [createFetchAdapter](functions/createFetchAdapter.md)
- [createHttpClient](functions/createHttpClient.md)
- [setReturnTo](functions/setReturnTo.md)
- [clearReturnTo](functions/clearReturnTo.md)
- [getReturnTo](functions/getReturnTo.md)
- [consumeReturnTo](functions/consumeReturnTo.md)

## Variables

- [defaultFetchAdapter](variables/defaultFetchAdapter.md)
- [can](variables/can.md)
- [hasRole](variables/hasRole.md)
- [hasAnyRole](variables/hasAnyRole.md)

## Type Aliases

- [AuthStatus](type-aliases/AuthStatus.md)
- [AuthListener](type-aliases/AuthListener.md)
- [CanFunction](type-aliases/CanFunction.md)
- [HasRoleFunction](type-aliases/HasRoleFunction.md)
- [HasAnyRoleFunction](type-aliases/HasAnyRoleFunction.md)
