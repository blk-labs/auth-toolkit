declare type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'member';
  created_at: string;
  last_login?: string;
  active_sessions: number;
  security_log: Array<{
    title: string;
    detail: string;
    time: string;
    color: 'mint' | 'lilac' | 'yellow' | 'coral';
  }>;
};
