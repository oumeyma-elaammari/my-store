import { useState} from "react";
import { useNavigate } from "react-router-dom"; 
import Register from "./register";  
import "./style.css";
import { useTranslation } from "react-i18next";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      <h2 className="title">{t("login.title")}</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          placeholder={t("login.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder={t("login.password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="BUTTON" type="submit">{t("login.button")}</button>
      </form>
      {error && <p>{error}</p>}
        <p >{t("login.noAccount")}<a href="/register">{t("login.registerHere")}</a>
        </p>
    </div>
  );
}

export default Login;
