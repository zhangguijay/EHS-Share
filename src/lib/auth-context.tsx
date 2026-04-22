"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing
const DEMO_USERS: Record<string, { password: string; user: User }> = {
  admin: {
    password: "admin123",
    user: {
      id: "1",
      username: "admin",
      name: "系统管理员",
      email: "admin@ehs-system.com",
      role: "系统管理员",
      department: "信息技术部",
    },
  },
  ehs_manager: {
    password: "ehs123",
    user: {
      id: "2",
      username: "ehs_manager",
      name: "李安全",
      email: "li.safe@ehs-system.com",
      role: "EHS主管",
      department: "安全环保部",
    },
  },
  safety_officer: {
    password: "safe123",
    user: {
      id: "3",
      username: "safety_officer",
      name: "王安全",
      email: "wang.safe@ehs-system.com",
      role: "安全员",
      department: "安全环保部",
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem("ehs_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("ehs_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const demoUser = DEMO_USERS[username.toLowerCase()];
    if (demoUser && demoUser.password === password) {
      setUser(demoUser.user);
      localStorage.setItem("ehs_user", JSON.stringify(demoUser.user));
      return { success: true, message: "登录成功" };
    }

    return { success: false, message: "用户名或密码错误" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ehs_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
