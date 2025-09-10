import { useCart } from './CartContext';
import './Cart.css'
import NavBar from '../navBar/navBar';
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Cart() {
  const { cart, dispatch } = useCart();
  const [clientName, setClientName] = useState("");
const [clientEmail, setClientEmail] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  if (cart.length === 0) {
    return <><NavBar/> <div className="container"><h3>{t("cart.empty")}</h3></div></>;
  }

  const handleCheckout = async (e) => {
  e.preventDefault();

  if (!clientName || !clientEmail) {
    alert("Veuillez remplir les deux champs.");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch("http://127.0.0.1:8000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_name: clientName,
        client_email: clientEmail,
        products: cart.map(p => ({
          id: p.id,
          title: p.title,
          price: p.price,
          quantity: p.quantity,
        })),
        total,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Commande enregistrée !");
      dispatch({ type: "CLEAR" });
      setClientName("");
      setClientEmail("");
      navigate("/");
    } else {
      alert("❌ Erreur: " + (data.message || "Échec de la commande."));
    }
  } catch  {
    alert("Erreur réseau.");
  } finally {
    setLoading(false);
  }
};



  return (
    <>
     <NavBar/>
    <div className="container">
      <h2 className="h2">{t("cart.title")}</h2>
      {cart.map((product) => (
        <div key={product.id} className="cart-item" >
          <img
            src={product.images?.[0] || 'https://via.placeholder.com/150'}
            alt={product.title}
            className='img'
            onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
          />
          <div >
            <h4 className='h4'>{product.title}</h4>
            <p>${product.price} x {product.quantity}</p>
            <div>
              <button className='button' style={{background:"#d0d0d0",color:"#7a050e"}} onClick={() => dispatch({ type: "DECREASE", product })}>-</button>
              <span>{product.quantity}</span>
              <button className='button'  style={{background:"#d0d0d0",color:"#7a050e"}}  onClick={() => dispatch({ type: "INCREASE", product })}>+</button>
              <button className='button' onClick={() => dispatch({ type: "REMOVE", product })}>
                {t("cart.remove")}
              </button>
            </div>
          </div>
        </div>
      ))}
      <h3>{t("cart.total")}: ${total.toFixed(2)}</h3>
     <div className="client-section">
 <form onSubmit={handleCheckout} className="client-form">
  <h4>🧾 <span>{t("cart.client_info")}</span></h4>
  <input
    type="text"
    placeholder={t("cart.name_placeholder")}
    value={clientName}
    onChange={(e) => setClientName(e.target.value)}
    required
    className="input"
  />
  <input
    type="email"
    placeholder={t("cart.email_placeholder")}
    value={clientEmail}
    onChange={(e) => setClientEmail(e.target.value)}
    required
    className="input"
  />
  <button type="submit" className="button" disabled={loading}>
    {loading ? t("cart.sending") : t("cart.submit")}
  </button>
</form>

</div>



      <button className="button" onClick={() => dispatch({ type: "CLEAR" })}>{t("cart.clear")}</button>
    </div>
  </>
  );
}

export default Cart;
