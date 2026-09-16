import type { HttpHandler } from 'msw';
import { loginHandler } from './login';

export const handlers: HttpHandler[] = [
  loginHandler,
];
