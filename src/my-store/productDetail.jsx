import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './productDtail.css'; 
function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  console.log("ID récupéré depuis URL :", id);


  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((Response)=>Response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.log("error fetching product",error))
  }, [id]);
  if (!product) return <div>loading pruduct ... </div>; 
  return (
   
      
      <div className="detail-container">
         <div className="product-detail">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back to Home
      </button>
        <div className="detail-images">
          {product.images && product.images.length > 0 && product.images
            .filter(img => typeof img === 'string' && img.startsWith('http'))
            .map((img, index) => (
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
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;