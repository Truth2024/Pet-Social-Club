import { createContext, useContext } from 'react';
import type { User } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebaseConfig';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: Error | null; // Явно указываем null вместо undefined
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, loading, error] = useAuthState(auth);

  // Преобразуем все undefined в null для соответствия типам
  const contextValue = {
    user: user ?? null,
    loading,
    error: error ?? null, // Явное преобразование undefined в null
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
