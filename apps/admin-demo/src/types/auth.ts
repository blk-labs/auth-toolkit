export interface LoginRequestBody {
  email?: string;
  username?: string;
  password?: string;
}

export interface AuthResponse {
  message?: string;
  status?: number;
  data: {
    accessToken: string;
    user: User
  };
}
