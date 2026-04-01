import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartSidebar = () => {
  const {
    cart,
    isSidebarOpen,
    setIsSidebarOpen,
    removeFromCart,
    updateQuantity,
    toggleSelect,
    selectAll,
    deselectAll,
    getProductStep,
    getProductMin
  } = useCart();

  const handleClose = () => setIsSidebarOpen(false);

  // Calculate totals for selected items
  const selectedItems = cart.filter(item => item.selected);
  const subtotal = selectedItems.reduce((acc, item) => acc + (item.quantity * item.product.price), 0);
  const allSelected = cart.length > 0 && selectedItems.length === cart.length;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClose}
      />

      {/* Slide-out Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-lg bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white text-gray-900 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-6 h-6 text-gray-800" />
            <span className="text-xl font-bold tracking-tight">Your Cart</span>
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-sm font-semibold ml-2">
              {cart.length}
            </span>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Contents */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-4">
              <ShoppingCart className="w-16 h-16 opacity-20" />
              <div>
                <p className="text-lg font-medium text-gray-600">Your cart is empty</p>
                <p className="text-sm mt-1">Looks like you haven't added anything yet.</p>
              </div>
              <button onClick={handleClose} className="px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors mt-4">
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Select All Bar */}
              <div className="flex items-center justify-between pb-2 mb-2">
                <button 
                  onClick={allSelected ? deselectAll : selectAll}
                  className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${allSelected ? 'bg-gray-900 border-gray-900' : 'border-gray-400'}`}>
                    {allSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                  </div>
                  {allSelected ? 'Deselect All' : 'Select All'}
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {cart.map((item) => {
                  const step = getProductStep(item.product);
                  const min = getProductMin(item.product);
                  
                  return (
                    <div key={item.product.id} className={`bg-white rounded-2xl p-4 flex gap-4 shadow-sm border-[1.5px] transition-colors ${item.selected ? 'border-gray-900' : 'border-transparent'}`}>
                      
                      {/* Selection Toggle */}
                      <button 
                        onClick={() => toggleSelect(item.product.id)}
                        className="mt-2"
                      >
                        <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${item.selected ? 'bg-gray-900 border-gray-900' : 'border-gray-400'}`}>
                          {item.selected && <CheckCircle2 className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                        </div>
                      </button>

                      {/* Image */}
                      <div className="w-[100px] h-[100px] rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 relative">
                        {item.product.image && (
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="text-[15px] font-bold text-gray-900 leading-tight line-clamp-2">
                              {item.product.name}
                            </h3>
                            <button 
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                          <p className="text-[13px] text-gray-500 mt-1 line-clamp-1">{item.product.description}</p>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="font-extrabold text-lg text-gray-900">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="h-9 flex items-center bg-gray-50 rounded-full border border-gray-200 overflow-hidden">
                            <button 
                              onClick={() => {
                                if (item.quantity <= min) {
                                  removeFromCart(item.product.id);
                                } else {
                                  updateQuantity(item.product.id, item.quantity - step);
                                }
                              }}
                              className="w-9 h-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                              {item.quantity <= min ? <Trash2 className="w-3.5 h-3.5 text-gray-500" /> : <Minus className="w-3.5 h-3.5" />}
                            </button>
                            <div className="w-12 text-center text-sm font-bold text-gray-900 border-x border-gray-200">
                              {item.quantity}
                            </div>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity + step)}
                              className="w-9 h-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Footer / Checkout */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 bg-white p-6 pb-8">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Subtotal ({selectedItems.length} items)</p>
                <div className="text-3xl font-extrabold text-gray-900 tracking-tight">
                  ₹{subtotal.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
            <button 
              disabled={selectedItems.length === 0}
              className={`w-full py-4 text-white font-bold text-lg rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                selectedItems.length === 0 
                  ? 'bg-gray-300 cursor-not-allowed shadow-none' 
                  : 'bg-gradient-to-r from-gray-900 to-black hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]'
              }`}
            >
              Checkout Now
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
