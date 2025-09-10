import { useEffect, useState } from "react";
import { useAuth } from "../routes/AuthContext";

function OrderList() {
  const { auth } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/orders", {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => {
        alert("Erreur de chargement des commandes");
        setLoading(false);
      });
  }, [auth.token]);

  return (
    <div className="dashboard-content">
      <h2 className="dashboard-title">
        <span role="img" aria-label="orders">📋</span>
        Commandes reçues
      </h2>

      <div className="orders-container">
        {loading ? (
          <div className="loading-message">Chargement en cours...</div>
        ) : orders.length === 0 ? (
          <div className="empty-message">Aucune commande pour le moment.</div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>
                  <span role="img" aria-label="client">🧍</span>
                  {order.client_name} ({order.client_email})
                </h3>
                <span className="order-total">{order.total} €</span>
              </div>
              
              <div className="order-details">
                <div className="order-products">
                  <h4><span role="img" aria-label="products">🛒</span> Produits</h4>
                  <ul>
                    {order.products.map((p, i) => (
                      <li key={i}>
                        <span className="product-name">{p.title}</span>
                        <span className="product-quantity">{p.quantity} x {p.price} €</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="order-meta">
                  <p>
                    <span role="img" aria-label="date">📅</span>
                    Commandé le : {new Date(order.created_at).toLocaleString()}
                  </p>
                  <span className={`order-status ${order.status || 'pending'}`}>
                    {order.status || 'En attente'}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OrderList;