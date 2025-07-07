import { BrowserRouter,Routes, Route } from 'react-router-dom';
import ProductList from './my-store/productList';
import ProductDetail from './my-store/productDetail';
import Login from './my-store/login';
import Register from './my-store/register';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/productDetail/:id" element={<ProductDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
