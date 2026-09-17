import { AuthContext } from '@/app/providers/AuthProvider';
import { useContext } from 'react';

//This Hook exposes the login, logout function and the Logged in User's session

export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
