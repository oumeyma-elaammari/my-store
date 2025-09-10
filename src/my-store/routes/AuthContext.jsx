import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    const role = sessionStorage.getItem("role");
    const email = sessionStorage.getItem("user_email");
    if (token) {
      setAuth({
        token,
        user: {
          role,
          email,
        },
      });
    }
  }, []);

  const login = (token, user) => {
    sessionStorage.setItem("access_token", token);
    sessionStorage.setItem("role", user.role);
    sessionStorage.setItem("user_email", user.email || "");
    setAuth({
      token,
      user: {
        role: user.role,
        email: user.email,
      },
    });
  };

  const logout = () => {
    sessionStorage.clear();
    setAuth(null);

  };

  const isAdmin = () => auth?.user?.role === "admin";
  const isSubadmin = () => auth?.user?.role === "subadmin";
  const isClient = () => auth?.user?.role === "client";

  return (
    <AuthContext.Provider value={{ auth, login, logout, isAdmin, isSubadmin, isClient }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
