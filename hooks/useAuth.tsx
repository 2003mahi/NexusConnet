
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUser: User = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  plan: 'free',
  analysesLeft: 5, // Increased for testing new feature
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const upgrade = () => {
    setUser(prevUser => prevUser ? { ...prevUser, plan: 'pro', analysesLeft: Infinity } : null);
  };

  const useAnalysis = (amount: number = 1) => {
    setUser(prevUser => {
      if (!prevUser || prevUser.plan === 'pro' || prevUser.analysesLeft < amount) return prevUser;
      return { ...prevUser, analysesLeft: prevUser.analysesLeft - amount };
    });
  };

  const value = { user, login, logout, upgrade, useAnalysis };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};