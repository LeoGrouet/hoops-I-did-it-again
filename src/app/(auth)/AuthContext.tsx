import { Redirect } from "expo-router";
import React, { createContext, useContext, useState } from "react";

type User = { id: string } | null;
type AuthContextType = {
  user: User;
  loading: boolean;
  signIn: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(false);

  const signIn = () => Redirect({ href: '/' });
  const signOut = () => setUser(null);
  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export default AuthContext;
