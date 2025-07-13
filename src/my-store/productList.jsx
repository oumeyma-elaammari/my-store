import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './productList.css'; 
import NavBar  from './navBar';
import { useCart } from "./CartContext";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [search,setSearch]=useState("");
  const { dispatch } = useCart();

  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("access_token");

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
   placeholder="Search by product name..."
   />
     <div className="category-table"> 
        <span className='category-item'>  Categories :</span>
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
    <div className='product-list'>     
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
            >
              <img
                src={product.images?.[0] || 'https://via.placeholder.com/150'}
                alt={product.title}
                className='PRODUCT-IMAGE'
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150';
                  
                }}
                   onClick={() => {
                if (!isLoggedIn) {
                  alert("You need to log in to view product details.");
                  return;
                }
                navigate(`/productDetail/${product.id}`);
              }}
              />
              <h4 className='PRODUCT-TITLE'>{product.title}</h4>
              <br/>
               <p className='PRODUCT-PRICE'>${product.price}</p>
              <p className='PRODUCT-CATEGORY'>{product.category?.name || 'No Category'}</p>
               <button className="button"    onClick={() => {
                if (!isLoggedIn) {
                  alert("You need to log in to shop products");
                  return;
                }
              dispatch({ type: "ADD", product });
             alert("product added to cart !");
              }}> Add to cart </button>
            </div>
          ))}
        </div>
      )}
    
  
    
    </div>
</>
  );
  
}

export default ProductList;
