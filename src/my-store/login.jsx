import { useState} from "react";
import { useNavigate } from "react-router-dom"; 
import Register from "./register";  
import "./style.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
   const data = await response.json();
   if(data.access_token) {
      sessionStorage.setItem("access_token", data.access_token);
      navigate("/");
    }
  } catch (err) {
    setError(err.message);
  }
}

  return (
    <div className="container">
      <h2 className="title">Login to access My Store</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="BUTTON" type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
        <p >Don't have an account ?<a href="/register"> Register here</a>
        </p>
    </div>
  );
}

export default Login;
