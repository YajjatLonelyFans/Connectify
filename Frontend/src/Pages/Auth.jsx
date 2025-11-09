import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Auth = () => {
  const { login, signup, isAuthenticated } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = isLogin ? login : signup;
    const res = isLogin
      ? await login(email, password)
      : await signup(name, email, password);

    if (res.success) window.location.href = "/posts";
    else alert(res.message);
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-3xl font-bold mb-4">{isLogin ? "Login" : "Sign Up"}</h1>

      {!isLogin && (
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isLogin ? "Login" : "Sign Up"}
      </button>

      <p
        onClick={() => setIsLogin(!isLogin)}
        className="text-blue-500 cursor-pointer mt-4"
      >
        {isLogin ? "New here? Create an account" : "Already have an account? Login"}
      </p>
    </div>
  );
};

export default Auth;

