/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from 'react';
import { API_BASE_URL } from '../utils/api';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

// Initial state matching the Cardinal Collection products
import { cardinalProducts as initialProducts } from '../data/productData';

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const resp = await fetch(`${API_BASE_URL}/api/orders?isAdmin=true`);
      const data = await resp.json();
      if (data.success) setOrders(data.orders);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  };


  const [feedbacks, setFeedbacks] = useState([
    { id: 1, rating: 'GOOD', suggestion: 'Excellent service and premium quality products!', date: '2026-04-01' },
    { id: 2, rating: 'AVERAGE', suggestion: 'Product range is good but delivery took longer than expected.', date: '2026-04-02' },
  ]);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const resp = await fetch(`${API_BASE_URL}/api/admin/users`);
      const data = await resp.json();
      if (data.success) setUsers(data.users);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const addProduct = (newProd) => {
    setProducts([{ ...newProd, id: Date.now() }, ...products]);
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(products.map(p => (p.id === id ? { ...p, ...updatedFields } : p)));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addOrder = async (order) => {
    try {
      const resp = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      const data = await resp.json();
      if (data.success) {
        setOrders(prev => [data.order, ...prev]);
        return data.order;
      }
    } catch (err) {
      console.error('Failed to add order:', err);
    }
    return null;
  };

  const updateOrderStatus = async (id, field, value) => {
    try {
      const resp = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ field, value })
      });
      const data = await resp.json();
      if (data.success) {
        setOrders(prev => prev.map(o => o.id === id ? data.order : o));
      }
    } catch (err) {
      console.error('Failed to update order status:', err);
    }
  };

  const addFeedback = (feedback) => {
    const newFeedback = { 
      ...feedback, 
      id: Date.now(), 
      date: new Date().toISOString().split('T')[0] 
    };
    setFeedbacks([newFeedback, ...feedbacks]);
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      orders,
      fetchOrders,
      addOrder,
      updateOrderStatus,
      feedbacks,
      addFeedback,
      users,
      fetchUsers
    }}>
      {children}
    </ProductContext.Provider>
  );
};
