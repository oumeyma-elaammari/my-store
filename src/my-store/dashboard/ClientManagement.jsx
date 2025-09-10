import { useEffect, useState } from "react";
import { useAuth } from "../routes/AuthContext";

function ClientManagement() {
  const { auth } = useAuth();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/clients", {
      headers: {
        Authorization: `Bearer ${auth.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClients(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des clients", err);
        setLoading(false);
      });
  }, [auth.token]);

  const handleDelete = async (id) => {
    if (!window.confirm("❗ Supprimer ce client ?")) return;

    const res = await fetch(`http://localhost:8000/api/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth.token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setClients(clients.filter((u) => u.id !== id));
      alert("✅ Client supprimé");
    } else {
      alert("❌ Erreur lors de la suppression");
    }
  };

  return (
    <div className="dashboard-content">
      <h2 className="dashboard-title">
        <span role="img" aria-label="clients">👥</span>
        Gestion des clients
      </h2>

      <div className="client-table-container">
        {loading ? (
          <p className="loading-message">Chargement en cours...</p>
        ) : clients.length === 0 ? (
          <p className="empty-message">Aucun client trouvé.</p>
        ) : (
          <table className="client-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Date d'inscription</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>{client.id}</td>
                  <td>{client.email}</td>
                  <td>{new Date(client.created_at).toLocaleString()}</td>
                  <td className="client-actions">
                    <button 
                      onClick={() => handleDelete(client.id)}
                      className="delete-client-btn"
                    >
                      <span role="img" aria-label="delete">🗑</span>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ClientManagement;