import  {useEffect,useState} from 'react';
import { useNavigate} from 'react-router-dom';
import './productList.css'; 

function ProductList(){
  const [products,setProducts]=useState([]);
   useEffect(()=>{
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((response)=>response.json())
      .then((data)=>setProducts(data))
      .catch((error)=>console.error("Error fetching products:", error));
  },[]);
  const navigate = useNavigate();
  return (
    <div className='product-list'>
   <h2 className='H2'>welcome to MY-STORE</h2>
   <h3 className='H3'>Here you find our list product </h3>
   <div className='products-container '>
     {products.map((product) => (
       <div key={product.id} className='PRODUCT-CARD'  onClick={() => navigate(`/productDetail/${product.id}`)} >
         <img 
           src={product.images[0]} 
           alt={product.title} 
           className='PRODUCT-IMAGE'
           onError={(e) => {
             e.target.src = 'https://via.placeholder.com/150';
           }}
         />
            <h4 className='PRODUCT-TITLE'>{product.title}</h4>
            <p className='PRODUCT-PRICE'>${product.price}</p>
         <p className='PRODUCT-CATEGORY'>{product.category?.name||'no Category'}</p>

       </div>
     ))}
   </div>
   </div>

  );
}
 export default ProductList;