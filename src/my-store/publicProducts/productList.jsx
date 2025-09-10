import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './productList.css';
import NavBar  from '../navBar/navBar';
import { useCart } from "../cartWish/CartContext";
import { useWishlist } from '../cartWish/WishlistContext';
import { useTranslation } from "react-i18next";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [search,setSearch]=useState("");
  const { dispatch } = useCart();
  const { wishlist, dispatchWishlist } = useWishlist();
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("access_token");
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://api.escuelajs.co/api/v1/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://api.escuelajs.co/api/v1/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const filteredProducts = products
  .filter((p) =>
    selectedCategory === "all" || p.category?.id.toString() === selectedCategory.toString()
  )
  .filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );


  return ( <>
   <NavBar/>
   <input className='search' 
   value={search}
   onChange={(e)=>setSearch(e.target.value)}
   placeholder={t("productList.searchByProductName")}
   />
     <div className="category-table"> 
        <span className='category-item'>{t("productList.categories")}</span>
        <span
          className={`category-item ${selectedCategory === "all" ? "active" : ""}`}
          onClick={() => setSelectedCategory("all")}
        >
         {t("productList.all")}
        </span>
        {categories.map((cat) => (
          <span
            key={cat.id}
            className={`category-item ${selectedCategory === cat.id ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </span>
        ))}
      </div>
    <div className='product-list'>     
      {loading ? (
        <p>{t("productList.loadingProducts")}</p>
      ) : filteredProducts.length === 0 ? (
        <p>{t("productList.noProductsAvailableForThisCategory")}</p>
      ) : (
        <div className='products-container'>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className='PRODUCT-CARD'
            > 
            <div className="product-image-container">
              <img
                src={product.images?.[0] || 'https://via.placeholder.com/150'}
                alt={product.title}
                className='PRODUCT-IMAGE'
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150';
                  
                }}
                   onClick={() => {
                if (!isLoggedIn) {
                  alert(t("productList.loginDetails"));
                  return;
                }
                navigate(`/productDetail/${product.id}`);
              }}
              />
                <span style={{ color: "#000"}}
    className={`wishlist-heart ${wishlist.some(item => item.id === product.id) ? 'active' : ''}`}
    onClick={(e) => {
      e.stopPropagation();
      if (!isLoggedIn) {
        alert(t("productList.loginWishlist"));
        return;
      }
      if (wishlist.some(item => item.id === product.id)) {
        dispatchWishlist({ type: "REMOVE", product });
      } else {
        dispatchWishlist({ type: "ADD", product });
      }
    }}
  >
{wishlist.some(item => item.id === product.id) ? ("❤️") :"♡" }
  </span>

</div>
              
                    
          
              <h4 className='PRODUCT-TITLE'>{product.title}</h4>
              <br/>
               <p className='PRODUCT-PRICE'>${product.price}</p>
              <p className='PRODUCT-CATEGORY'>{product.category?.name || t("productList.noCategory")}</p>
               <button className="button"    onClick={() => {
                if (!isLoggedIn) {
                  alert(t("productList.loginShop"));
                  return;
                }
              dispatch({ type: "ADD", product });
             alert(t("productList.productAdded"));
              }}>{t("productList.addToCart")} </button>
            </div>
          ))}
        </div>
      )}
    
  
    
    </div>
</>
  );
  
}

export default ProductList;
