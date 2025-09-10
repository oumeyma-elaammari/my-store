import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  const exists = state.find(p => p.id === action.product.id);
  switch (action.type) {
    case "ADD":
      if (exists) {
        return state.map(p =>
          p.id === action.product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...state, { ...action.product, quantity: 1 }];
      }
    case "REMOVE":
      return state.filter(p => p.id !== action.product.id);
    case "INCREASE":
      return state.map(p =>
        p.id === action.product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
    case "DECREASE":
      return state.map(p =>
        p.id === action.product.id
          ? { ...p, quantity: Math.max(1, p.quantity - 1) }
          : p
      );
    case "CLEAR":
      return [];
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
