import { http, HttpResponse, type HttpHandler, type PathParams } from 'msw';
import usersData from '../data/users.json';
import axios from 'axios';
import type { AuthResponse, LoginRequestBody } from '../types/auth';
import { ThrowError } from '../utils/helper';

export const loginHandler: HttpHandler = http.post<PathParams, LoginRequestBody>(
  '/api/login',
  async ({ request }) => {
    const body = await request.json();
    const { email, password } = body;

    const user = usersData.find((u) => {
      if (email) return u.email === email;
      return false;
    });

    if (!user || user.password !== password) {
      return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const safeUser = Object.entries(user)
      .filter(([key]) => key !== 'password')
      .reduce<Record<string, unknown>>((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    return HttpResponse.json({
      status: 200,
      message: 'success',
      data: {
        accessToken: `mock-token.${String(safeUser.id)}.${Date.now().toString()}`,
      },
    });
  },
);

export async function AuthLogin(data: LoginRequestBody) {
  try{

    const res = await axios.post<BaseBackendResponse<AuthResponse>>('/api/login', data);
    return res.data;
  }catch(err){
    ThrowError(err)
  }
}