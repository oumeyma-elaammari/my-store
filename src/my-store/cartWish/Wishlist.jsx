import { useWishlist } from "./WishlistContext";  
import { useCart } from "./CartContext";
import "./Cart.css"; 
import NavBar from "../navBar/navBar";
import { useTranslation } from "react-i18next";

function Wishlist() {
  const { wishlist, dispatchWishlist } = useWishlist(); 
  const { dispatch } = useCart();
  const { t } = useTranslation();

  if (wishlist.length === 0) {
    return (
      <>
        <NavBar />
        <div className="container">
          <h2 className="h2">{t("wishlist.empty")}</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="container">
        <h2 className="h2">{t("wishlist.title")}</h2>
        {wishlist.map((product) => (
          <div key={product.id} className="cart-item">
            <button className="button remove" onClick={() => dispatchWishlist({ type: "REMOVE", product })}>
              ✖
            </button>
            <img
              src={product.images?.[0] || 'https://via.placeholder.com/150'}
              alt={product.title}
              className="img"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150';
              }}
            />
            <div className="info">
              <h4 className="h4">{product.title}</h4>
              <p>${product.price}</p>
              <button
                className="button"
                onClick={() => {
                  dispatch({ type: "ADD", product });
                  alert(t("wishlist.productAdded"));
                }}
              >
                {t("wishlist.add")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Wishlist;
