export interface LoginRequestBody {
  email?: string;
  username?: string;
  password?: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  image: string;
  role: 'admin' | 'user';
  company: {
    name: string;
    title: string;
  };
}

export interface AuthResponse {
  message?: string;
  status?: number;
  data: UserData;
}

interface UserData {
  accessToken: string;
  user: User;
}
