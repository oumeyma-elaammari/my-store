import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import './productDtail.css'; 
import NavBar from './navBar';
import { useCart } from "./CartContext";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  //const navigate = useNavigate ();
  const { dispatch } = useCart();


  console.log("ID récupéré depuis URL :", id);


  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((Response)=>Response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.log("error fetching product",error))
  }, [id]);
  if (!product) return <div>loading pruduct ... </div>; 
 
  return (
   <>
      <NavBar />
      <div className="detail-container">
         <div className="product-detail">
   
        <div className="detail-images">
          {product.images.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`${product.title} ${index + 1}`} 
                className="detail-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300';
                }}
              />
            ))}
        </div>
        
        <div className="detail-info">
          <h2 className='PRODUCT-TITLE'>{product.title}</h2>
          <p className="price">${product.price}</p>
          <p className="category">{product.category?.name || 'No category'}</p>
          <p className="description">{product.description}</p>
          <button  className='button' onClick={() => {dispatch({ type: "ADD", product })     
              alert("product added to cart !");}
}>
            Add to Cart
          </button>        </div>
      </div>
    </div>
  </>
  );
}

export default ProductDetail;