import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './productDtail.css'; 
import NavBar from '../navBar/navBar';
import { useCart } from "../cartWish/CartContext";
import { useWishlist } from '../cartWish/WishlistContext';
import { useTranslation } from "react-i18next";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { dispatch } = useCart();
  const { wishlist, dispatchWishlist } = useWishlist();
  const { t } = useTranslation();

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) return <div>{t("productDetail.loading")}</div>;

  const isInWishlist = wishlist.some(item => item.id === product.id);

  return (
    <>
      <NavBar />
      <div className="detail-container">
        <div className="product-detail">
            <div className="product-image-container">
          <div className="detail-images">
            {(product.images || []).map((img, index) => (
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

          <span style={{ color: "#000"}}
            className={`wishlist-heart ${isInWishlist ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              dispatchWishlist({
                type: isInWishlist ? "REMOVE" : "ADD",
                product
              });
            }}
          >
            {isInWishlist ? "❤️" : "♡"}
          </span>
</div>
          <div className="detail-info">
            <h2 className='PRODUCT-TITLE'>{product.title}</h2>
            <p className="price">${product.price}</p>
            <p className="category">{product.category?.name || t("productDetail.noCategory")}</p>
            <p className="description">{product.description}</p>
            <button
              className='button'
              onClick={() => {
                dispatch({ type: "ADD", product });
                alert(t("productDetail.addedToCart"));
              }}
            >
             {t("productDetail.addToCart")}
            </button>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
