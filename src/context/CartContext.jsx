import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Try to load cart from local storage, or default to empty array
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('abirami_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.error("Could not load cart from local storage", e);
      return [];
    }
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('abirami_cart', JSON.stringify(cart));
    } catch (e) {
      console.error("Could not save cart to local storage", e);
    }
  }, [cart]);

  // Determine standard unit increment step based on category/unit. 
  // For tiles it might be 20 sqft, for faucets it's 1 PC. Let's make it smart or default 1.
  const getProductStep = (product) => {
    return product.unit === 'sq. ft.' ? 20 : 1;
  };

  const getProductMin = (product) => {
    return product.unit === 'sq. ft.' ? 100 : 1;
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.product.id === product.id);
      if (existing) {
        return prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + getProductStep(product), selected: true } 
            : item
        );
      }
      return [...prevCart, { product, quantity: getProductMin(product), selected: true }];
    });
    // Open sidebar automatically when adding
    setIsSidebarOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart(prevCart => prevCart.map(item => 
      item.product.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const toggleSelect = (productId) => {
    setCart(prevCart => prevCart.map(item => 
      item.product.id === productId ? { ...item, selected: !item.selected } : item
    ));
  };

  const selectAll = () => {
    setCart(prevCart => prevCart.map(item => ({ ...item, selected: true })));
  };

  const deselectAll = () => {
    setCart(prevCart => prevCart.map(item => ({ ...item, selected: false })));
  };

  const value = {
    cart,
    isSidebarOpen,
    setIsSidebarOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleSelect,
    selectAll,
    deselectAll,
    getProductStep,
    getProductMin
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
