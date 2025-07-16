import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { CartProvider } from './my-store/CartContext';
import { WishlistProvider } from './my-store/WishlistContext';
import './translations/i18n';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WishlistProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </WishlistProvider>
  </StrictMode>
);
