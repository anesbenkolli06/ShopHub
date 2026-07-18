import React, { useContext, useState, createContext } from 'react';
import { getProductById } from '../data/Products';  

const CartContext = createContext(null);

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product) { 
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  }

  function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  function getCartItemsWithProducts() {
    return cartItems.map(item => ({
      ...item,
      product: getProductById(item.id)
    }));
  }

  function getCartTotal() {
    return cartItems.reduce((sum, item) => {
      const product = getProductById(item.id);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartItemsWithProducts,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartProvider;