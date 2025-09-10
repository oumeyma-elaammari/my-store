import React, { useEffect, useState } from "react";
import  {useNavigate } from "react-router-dom";
import "./navBar.css";
import { useCart } from "../cartWish/CartContext";
import { useWishlist } from "../cartWish/WishlistContext";
import { useTranslation } from "react-i18next";
import { useAuth } from "../routes/AuthContext";

function NavBar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cart } = useCart();
  const {wishlist}= useWishlist();
const { t, i18n } = useTranslation();
  const { auth, logout } = useAuth();

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    setIsLoggedIn(!!token); 
  }, []); 
  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    setIsLoggedIn(false);
    navigate("/");
  };
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
   const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="navBar">
      <h1 className="logo" onClick={() => navigate("/")}>My-STORE</h1>
      <ul className="menu">
        <li onClick={() => navigate("/")}>{t("navBar.home")}</li>

        {isLoggedIn ? (
          <>
                  <li onClick={() => navigate("/cart")}> 
                    🛒<span>{totalQuantity}</span>
                    </li>  
                    <li onClick={()=>navigate("/wishlist")}>❤️{wishlist.length}</li>      
                  <li onClick={handleLogout}>{t("navBar.logout")}</li>
          </>
        ) : (
          <li onClick={() => navigate("/login")}>{t("navBar.login")}</li>
        )}


<li className="lang-switcher">
    <svg className="language-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#afafaf">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
          <select onChange={(e) => changeLanguage(e.target.value)} style={{ marginLeft: "2px" }}>
            <option value="en">EN</option>
            <option value="fr">FR</option>
            <option value="ar">AR</option>
          </select>
        </li>
       
      </ul>
    </div>
  );
}

export default NavBar;
