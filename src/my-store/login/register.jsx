import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useTranslation } from "react-i18next";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name, email, password }),
    });

    console.log("Raw response:", response);

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 409) {
        throw new Error("Cet email est déjà utilisé.");
      }
      throw new Error(data.message || "Erreur d'inscription");
    }

    sessionStorage.setItem("access_token", data.access_token);
    sessionStorage.setItem("role", data.user.role || "client");
    sessionStorage.setItem("user_email", data.user.email);

    navigate("/");
  } catch (err) {
    console.error("Error:", err);
    setError(err.message);
  }
};


  return (
    <div className="container">
      <h2 className="title">{t("register.registerToAccessMyStore")}</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder={t("register.name")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder={t("register.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={t("register.password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="BUTTON">{t("register.button")}</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Register;
