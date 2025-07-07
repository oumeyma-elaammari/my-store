import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './productList.css'; 

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("access_token");

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

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter((p) => p.category?.id === selectedCategory);

  return ( <>
   
    
    <div className='product-list'>
      <div className='header'>
         <h2 className='H2'>Welcome to MY-STORE :</h2>
      <h3 className='H3'>Here you find our product list</h3>
      <br/>
        {isLoggedIn ? (
          <button
            className='BUTTON'
            onClick={() => {
              localStorage.removeItem("access_token");
              navigate("/");
            }}
          >
            Log out
          </button>
        ) : (
          <button className='BUTTON' onClick={() => navigate("/login")}>
            Log in
          </button>
        )}
        </div>
      

      {}
      <div className="category-table"> 
        <span className='category-item'> Categories :</span>
        <span
          className={`category-item ${selectedCategory === "all" ? "active" : ""}`}
          onClick={() => setSelectedCategory("all")}
        >
          All
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

      {}
      {loading ? (
        <p>Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p>No products available for this category.</p>
      ) : (
        <div className='products-container'>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className='PRODUCT-CARD'
              onClick={() => {
                if (!isLoggedIn) {
                  alert("You need to log in to view product details.");
                  return;
                }
                navigate(`/productDetail/${product.id}`);
              }}
            >
              <img
                src={product.images?.[0] || 'https://via.placeholder.com/150'}
                alt={product.title}
                className='PRODUCT-IMAGE'
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150';
                }}
              />
              <h4 className='PRODUCT-TITLE'>{product.title}</h4>
              <p className='PRODUCT-PRICE'>${product.price}</p>
              <p className='PRODUCT-CATEGORY'>{product.category?.name || 'No Category'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
</>
  );
  
}

export default ProductList;
