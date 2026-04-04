/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

// Initial state matching the Cardinal Collection products
import { cardinalProducts as initialProducts } from '../data/productData';

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  
  // Manage Global Orders
  const [orders, setOrders] = useState([
    { id: '#ORD-9912', cx: 'Jane Doe', items: ['Cardinal Faucet (1)', 'Praseo Basin (1)'], total: '₹2,799', packed: true, delivery: 'Delivered', date: '2026-04-01' },
    { id: '#ORD-9913', cx: 'Rahul K.', items: ['Praseo Basin (2)'], total: '₹14,200', packed: true, delivery: 'In Transit', date: '2026-04-02' },
    { id: '#ORD-9914', cx: 'Siva M.', items: ['Chimney Pro (1)'], total: '₹18,500', packed: false, delivery: 'Pending', date: '2026-04-03' },
    { id: '#ORD-9915', cx: 'Anjali P.', items: ['Closet Set (1)', 'Floor Tiles (50 sqft)'], total: '₹9,450', packed: true, delivery: 'In Transit', date: '2026-04-03' },
  ]);

  const addProduct = (newProd) => {
    setProducts([{ ...newProd, id: Date.now() }, ...products]);
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(products.map(p => (p.id === id ? { ...p, ...updatedFields } : p)));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addOrder = (order) => {
    // Generate a mockup ID, e.g., #ORD-9916 logic
    const mockId = `#ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = { ...order, id: mockId, packed: false, delivery: 'Pending', date: new Date().toISOString().split('T')[0] };
    setOrders([newOrder, ...orders]);
  };

  const updateOrderStatus = (id, field, value) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, [field]: value } : o));
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      orders,
      addOrder,
      updateOrderStatus
    }}>
      {children}
    </ProductContext.Provider>
  );
};
