import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('lumina_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    const users = JSON.parse(localStorage.getItem('lumina_users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = { id: foundUser.id, username: foundUser.username, email: foundUser.email };
      localStorage.setItem('lumina_user', JSON.stringify(userData));
      setUser(userData);
      setIsLoggedIn(true);
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const register = async (username: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('lumina_users') || '[]');
    if (users.find((u: any) => u.email === email)) {
      throw new Error('Email already registered');
    }

    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      email,
      password // In a real app, this should be hashed
    };

    users.push(newUser);
    localStorage.setItem('lumina_users', JSON.stringify(users));
    
    // Auto login after register
    const userData = { id: newUser.id, username: newUser.username, email: newUser.email };
    localStorage.setItem('lumina_user', JSON.stringify(userData));
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('lumina_user');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
