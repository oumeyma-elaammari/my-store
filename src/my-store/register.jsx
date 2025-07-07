import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./style.css";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("https://api.lorem.space/image/face?w=640&h=480");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
      <h2 className='title'>Register to access My Store</h2>
      <form onSubmit={handleSubmit} className='form'>
        <input
          type="text"
          placeholder="your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
        <button type="submit" className='BUTTON'>Register</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Register;
