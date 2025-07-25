import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const addToWishlist = (course) => {
    const isAlreadyInWishlist = wishlist.find(item => item._id === course._id);
    if (!isAlreadyInWishlist) {
      setWishlist(prev => [...prev, course]);
    }
  };

  const removeFromWishlist = (courseId) => {
    setWishlist(prev => prev.filter(item => item._id !== courseId));
  };

  const addToCart = (course) => {
    const isAlreadyInCart = cart.find(item => item._id === course._id);
    if (!isAlreadyInCart) {
      setCart(prev => [...prev, course]);
    }
  };

  const removeFromCart = (courseId) => {
    setCart(prev => prev.filter(item => item._id !== courseId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.pricing, 0);
  };

  const isInWishlist = (courseId) => {
    return wishlist.some(item => item._id === courseId);
  };

  const isInCart = (courseId) => {
    return cart.some(item => item._id === courseId);
  };

  const value = {
    wishlist,
    cart,
    addToWishlist,
    removeFromWishlist,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    isInWishlist,
    isInCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 