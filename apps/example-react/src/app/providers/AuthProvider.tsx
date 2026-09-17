import { createContext, useEffect, useState, type PropsWithChildren } from 'react';
import { AuthManager, WebStorageTokenStore, type AuthState } from '@auth-toolkit/core';
import type { User } from '@/modules/auth/types';

const storage = new WebStorageTokenStore(undefined, localStorage);
const authManager = new AuthManager<User>(storage);

const AuthContext = createContext<{
  state: AuthState<User>;
  login: (user: User, token: string) => Promise<void>;
  logout: () => void;
} | null>(null);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [userSession, setUserSession] = useState<AuthState<User>>(authManager.getState());

  useEffect(() => {
    const unsubscribe = authManager.subscribe((newState) => {
      setUserSession(newState);
    });

    authManager.bootstrapAuth().catch(console.error);

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state: userSession,
        login: authManager.login.bind(authManager),
        logout: authManager.logout.bind(authManager),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
