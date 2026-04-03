import React, { createContext, useState, useContext } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

// Initial state matching the Cardinal Collection products
const initialProducts = [
  {
    id: 1,
    name: 'Cardinal Matte Black Basin Faucet',
    description: 'A sleek and modern matte black faucet designed for contemporary bathrooms with a bold premium finish.',
    price: 2799,
    mrp: 3999,
    image: '/images/faucets/cardinal_set1_1.png',
    rating: 4.8,
    reviews: 1124,
    category: 'faucets',
    tags: ['Best Seller'],
    variants: [{ id: 1, key: 'Size', value: 'Standard' }, { id: 2, key: 'Color', value: 'Matte Black' }]
  },
  {
    id: 2,
    name: 'Cardinal Matte Black Basin Faucet',
    description: 'A sleek and modern matte black faucet designed for contemporary bathrooms with a bold premium finish.',
    price: 2799,
    mrp: 3999,
    image: '/images/faucets/cardinal_set1_2.png',
    rating: 4.8,
    reviews: 842,
    category: 'faucets',
    tags: ['Offer'],
    variants: [{ id: 1, key: 'Installation', value: 'Deck Mount' }]
  },
  {
    id: 3,
    name: 'Cardinal Chrome Classic Faucet',
    description: 'A timeless chrome-finished faucet with a polished shine, suitable for modern and traditional interiors.',
    price: 3499,
    mrp: 4599,
    image: '/images/faucets/cardinal_set1_3.png',
    rating: 4.6,
    reviews: 2301,
    category: 'faucets'
  },
  {
    id: 4,
    name: 'Cardinal Chrome Classic Faucet',
    description: 'A timeless chrome-finished faucet with a polished shine, suitable for modern and traditional interiors.',
    price: 3499,
    mrp: 4599,
    image: '/images/faucets/cardinal_set1_4.png',
    rating: 4.7,
    reviews: 1840,
    category: 'faucets',
    tags: ['Discount', 'Prime Products']
  },
  {
    id: 5,
    name: 'Cardinal Rose Gold Luxury Faucet',
    description: 'Elegant rose gold faucet crafted for a luxurious bathroom experience with a warm metallic tone.',
    price: 4299,
    mrp: 5499,
    image: '/images/faucets/cardinal_set1_5.jpg',
    rating: 4.9,
    reviews: 512,
    category: 'faucets'
  },
  {
    id: 6,
    name: 'Cardinal Rose Gold Luxury Faucet',
    description: 'Elegant rose gold faucet crafted for a luxurious bathroom experience with a warm metallic tone.',
    price: 4299,
    mrp: 5499,
    image: '/images/faucets/cardinal_new_6.png',
    rating: 4.9,
    reviews: 320,
    category: 'faucets'
  },
  {
    id: 7,
    name: 'Cardinal Rose Gold Luxury Faucet',
    description: 'Elegant rose gold faucet crafted for a luxurious bathroom experience with a warm metallic tone.',
    price: 4299,
    mrp: 5499,
    image: '/images/faucets/cardinal_new_7.png',
    rating: 4.8,
    reviews: 415,
    category: 'faucets'
  },
  {
    id: 8,
    name: 'Cardinal Wall-Mounted Slim Faucet',
    description: 'A space-saving wall-mounted faucet with a clean and minimal modern design.',
    price: 3899,
    mrp: 4999,
    image: '/images/faucets/cardinal_new_8.png',
    rating: 4.5,
    reviews: 198,
    category: 'faucets'
  },
  {
    id: 9,
    name: 'Cardinal Wall-Mounted Slim Faucet',
    description: 'A space-saving wall-mounted faucet with a clean and minimal modern design.',
    price: 3899,
    mrp: 4999,
    image: '/images/faucets/cardinal_new_9.png',
    rating: 4.7,
    reviews: 254,
    category: 'faucets'
  },
  {
    id: 10,
    name: 'Cardinal Waterfall Designer Faucet',
    description: 'A stunning waterfall-style faucet delivering smooth natural flow for a spa-like experience.',
    price: 4999,
    mrp: 6499,
    image: '/images/faucets/cardinal_new_10.jpg',
    rating: 5.0,
    reviews: 88,
    category: 'faucets'
  }
];

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
