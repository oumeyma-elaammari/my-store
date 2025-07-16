import { useCart } from './CartContext';
import './Cart.css'
import NavBar from './navBar';
import { useTranslation } from "react-i18next";

function Cart() {
  const { cart, dispatch } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const { t } = useTranslation();

  if (cart.length === 0) {
    return <><NavBar/> <div className="container"><h3>{t("cart.empty")}</h3></div></>;
  }

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
      <button className="button" onClick={() => dispatch({ type: "CLEAR" })}>{t("cart.clear")}</button>
    </div>
  </>
  );
}

export default Cart;
