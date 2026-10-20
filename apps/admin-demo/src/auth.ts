import { createAuthManager } from '@auth-toolkit/react';
import axios from 'axios';

import { Identifier } from './constants';

export const authManager = createAuthManager<User>({
  storage: 'localStorage',
  storageKey: Identifier.storageKey,
  onRefresh: async (currentToken) => {
    const res = await axios.post('/api/auth/refresh', { currentToken });
    const data = await res.data.data;

    console.log(data);

    return {
      accessToken: data.accessToken,
      user: data.user,
    };
  },
});
