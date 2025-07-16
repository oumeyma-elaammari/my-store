import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./style.css";
import { useTranslation } from "react-i18next";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("https://api.lorem.space/image/face?w=640&h=480");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          avatar,
        }),
      });

      if (!response.ok) {
        // Lire le message d'erreur de l'API
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

    
      const data = await response.json();

     
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='container' >
      <h2 className='title'>{t("register.registerToAccessMyStore")}</h2>
      <form onSubmit={handleSubmit} className='form'>
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
        <input
          type="text"
          placeholder={t("register.avatarURL")}
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
        <button type="submit" className='BUTTON'>{t("register.button")}</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Register;
