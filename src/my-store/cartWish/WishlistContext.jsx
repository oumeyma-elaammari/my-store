import { createContext, useContext, useReducer } from "react";

const WishlistContext = createContext();

const WishlistReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      if (state.find(item => item.id === action.product.id)) return state;
      return [...state, action.product];
    case "REMOVE":
      return state.filter(item => item.id !== action.product.id);
    default:
      return state;
  }
};

export function WishlistProvider({ children }) {
  const [wishlist, dispatchWishlist] = useReducer(WishlistReducer, []);
  return (
    <WishlistContext.Provider value={{ wishlist, dispatchWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
