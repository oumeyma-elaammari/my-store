import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './my-store/productList';
import ProductDetail from './my-store/productDetail';
import Login from './my-store/login';
import Register from './my-store/register';
import Cart from './my-store/cart';
import Wishlist from './my-store/Wishlist';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/productDetail/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
