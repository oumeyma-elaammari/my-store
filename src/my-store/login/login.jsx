import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useTranslation } from "react-i18next";
import { useAuth } from "../routes/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur de connexion");
      }

      // Utilise le contexte pour stocker
      login(data.access_token, data.user);

      // Redirection selon rôle
      if (data.user.role === "admin") navigate("/admin");
      else if (data.user.role === "subadmin") navigate("/subadmin");
      else navigate("/");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
          disabled={loading}
        />
        <input
          type="password"
          placeholder={t("login.password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <button className="BUTTON" type="submit" disabled={loading}>
          {loading ? t("login.loading") || "Connexion..." : t("login.button")}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
        {t("login.noAccount")}{" "}
        <a href="/register">{t("login.registerHere")}</a>
      </p>
    </div>
  );
}

export default Login;
