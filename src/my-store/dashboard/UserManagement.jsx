import { useState, useEffect } from "react";
import { useAuth } from "../routes/AuthContext";
import "./dashboard.css";

function UserManagement() {
  const { auth, logout, isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);

  const apiBase = "http://localhost:8000/api";

  // Helper pour fetch avec gestion du token et erreurs
  const apiFetch = async (url, opts = {}) => {
    if (!auth?.token) {
      logout();
      throw new Error("Non authentifié — veuillez vous reconnecter.");
    }

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      ...(opts.headers || {}),
    };

    const response = await fetch(url, { ...opts, headers });

    if (!response.ok) {
      if (response.status === 401) {
        logout();
        throw new Error("Session expirée, reconnecte-toi");
      }
      let payload = {};
      try {
        payload = await response.json();
      } catch (e) {
        console.error("Erreur parsing JSON:", e);
      }
      const msg = payload?.message || `Erreur HTTP ${response.status}`;
      throw new Error(msg);
    }

    return response.json();
  };

  // Charger les utilisateurs (uniquement si admin)
  useEffect(() => {
    const loadUsers = async () => {
      if (!auth?.token || !isAdmin()) {
        setError("Accès refusé ou non authentifié.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const body = await apiFetch(`${apiBase}/users`);
        setUsers(body.data || body); 
      } catch (e) {
        console.error("Erreur récupération utilisateurs:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [auth?.token]);

  // Création de sous-admin (seulement admin)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth?.token || !isAdmin()) {
      alert("Tu dois être connecté en tant qu'administrateur.");
      return;
    }

    setCreating(true);
    setError(null);
    try {
      const body = await apiFetch(`${apiBase}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const newUser = body.user;
      setUsers((prev) => [...prev, newUser]);
      setForm({ name: "", email: "", password: "" });
      alert("Sous-admin créé !");
    } catch (e) {
      console.error("Erreur création sous-admin:", e);
      setError(e.message);
    } finally {
      setCreating(false);
    }
  };

  // Suppression utilisateur
  const handleDelete = async (id, role) => {
    if (!auth?.token || !isAdmin()) {
      alert("Tu n'as pas la permission.");
      return;
    }
    if (role === "admin") {
      alert("Vous ne pouvez pas supprimer l'administrateur principal.");
      return;
    }
    if (!window.confirm("Confirmer la suppression ?")) return;

    try {
      await apiFetch(`${apiBase}/users/${id}`, {
        method: "DELETE",
      });
      setUsers((prev) => prev.filter((u) => u.id !== id));
      alert("Utilisateur supprimé !");
    } catch (e) {
      console.error("Erreur suppression utilisateur:", e);
      setError(e.message);
    }
  };

  return (
    <div className="dashboard-content">
      <h2 className="dashboard-title">
        <span role="img" aria-label="users">
          👥
        </span>{" "}
        Gestion des Sous-admins
      </h2>

      {error && (
        <div className="error-banner" style={{ marginBottom: "1rem" }}>
          Erreur : {error}
        </div>
      )}

      <div className="user-management-container">
        <div className="user-list-section">
          <h3>
            <span role="img" aria-label="list">
              📄
            </span>{" "}
            Liste des utilisateurs
          </h3>

          {loading ? (
            <div className="loading-message">Chargement des utilisateurs...</div>
          ) : users.length === 0 ? (
            <div className="empty-message">Aucun utilisateur trouvé.</div>
          ) : (
            <div className="table-responsive">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Rôle</th>
                    <th>Créé le</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>
                        <span className={`role-badge ${u.role}`}>{u.role}</span>
                      </td>
                      <td>{new Date(u.created_at).toLocaleDateString()}</td>
                      <td>
                        {u.role !== "admin" && (
                          <button
                            onClick={() => handleDelete(u.id, u.role)}
                            className="delete-btn"
                          >
                            Supprimer
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="user-form-section">
          <h3>
            <span role="img" aria-label="add">
              +
            </span>{" "}
            Ajouter un sous-admin
          </h3>
          <form onSubmit={handleSubmit} className="user-form">
            <input
              required
              type="text"
              placeholder="Nom"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              disabled={creating}
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              disabled={creating}
            />
            <input
              required
              type="password"
              placeholder="Mot de passe"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              disabled={creating}
            />
            <button type="submit" className="submit-btn" disabled={creating}>
              {creating ? "Création..." : "Créer un sous-admin"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
