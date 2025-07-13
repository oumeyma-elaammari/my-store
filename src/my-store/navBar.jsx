import React, { useEffect, useState } from "react";
import  {useNavigate } from "react-router-dom";
import "./navBar.css";
import { useCart } from "./CartContext";




function NavBar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cart } = useCart();

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

  return (
    <div className="navBar">
      <h1 className="logo" onClick={() => navigate("/")}>My-STORE</h1>
      <ul className="menu">
        <li onClick={() => navigate("/")}>Home</li>

        {isLoggedIn ? (
          <>
<li onClick={() => navigate("/cart")}> 🛒<span style={{ background: "red", color: "white", padding: "2px 8px", borderRadius: "50%", fontSize: "0.9rem" }}>{totalQuantity}</span>
</li>            <li onClick={handleLogout}>Log out</li>
          </>
        ) : (
          <li onClick={() => navigate("/login")}>Log in</li>
        )}
      </ul>
    </div>
  );
}

export default NavBar;
