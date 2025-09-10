import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { CartProvider } from './my-store/cartWish/CartContext';
import { WishlistProvider } from './my-store/cartWish/WishlistContext';
import { AuthProvider } from './my-store/routes/AuthContext';
import './translations/i18n';

function RootProviders({ children }) {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>{children}</CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootProviders>
      <App />
    </RootProviders>
  </StrictMode>
);
