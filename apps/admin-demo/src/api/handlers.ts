import type { HttpHandler } from 'msw';
import { loginHandler } from './login';
import { sessionHandler } from './session';
import { refreshHandler } from './refresh';

export const handlers: HttpHandler[] = [
  loginHandler,
  sessionHandler,
  refreshHandler
];