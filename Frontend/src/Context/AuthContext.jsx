import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
axios.defaults.baseURL = "https://connectify-r0y3.onrender.com";


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const res = await axios.get("/api/users/profile");
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching profile:", err);
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);


  const signup = async (name, email, password) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", { name, email, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      return { success: true };
    } catch (error) {
      console.error("Signup failed:", error);
      return { success: false, message: error.response?.data?.message || "Signup failed" };
    } finally {
      setLoading(false);
    }
  };


  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, message: error.response?.data?.message || "Login failed" };
    } finally {
      setLoading(false);
    }
  };


  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{user,token,loading,signup,login,logout,isAuthenticated: !!token,}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;