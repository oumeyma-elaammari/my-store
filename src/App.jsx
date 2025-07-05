import { BrowserRouter,Routes, Route } from 'react-router-dom';
import ProductList from './my-store/productList';
import ProductDetail from './my-store/productDetail';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/productDetail/:id" element={<ProductDetail />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
