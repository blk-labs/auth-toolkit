import type { HttpHandler } from 'msw';

import { loginHandler } from './login';
import { refreshHandler } from './refresh';
import { sessionHandler } from './session';

export const handlers: HttpHandler[] = [loginHandler, sessionHandler, refreshHandler];
