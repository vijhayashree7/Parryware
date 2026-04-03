import React from 'react';
import { X, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleProductClick = (prod) => {
    if (prod === 'Basin') navigate('/basin');
    else if (prod === 'Faucets') navigate('/faucets');
    else if (prod === 'Water Heater') navigate('/water-heater');
    else if (prod === 'Chimney') navigate('/chimney');
    else if (prod === 'Tiles and Surface') navigate('/tiles-and-surface');
    else if (prod === 'Closet') navigate('/closet');

    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-full max-w-sm bg-black text-white z-50 transform transition-transform duration-500 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-8 border-b">
          <span className="text-xl uppercase">Menu</span>
          <X size={32} className="cursor-pointer" onClick={onClose} />
        </div>

        <div className="flex-1 overflow-y-auto py-8 px-8 space-y-6">
          <div>
            <div className="flex items-center justify-between text-2xl mb-4">
              Our Products <ChevronRight size={20} />
            </div>

            <ul className="pl-4 space-y-4">
              {['Water Heater', 'Closet', 'Basin', 'Faucets', 'Chimney', 'Tiles and Surface'].map(prod => (
                <li
                  key={prod}
                  onClick={() => handleProductClick(prod)}
                  className="cursor-pointer hover:text-gray-300"
                >
                  {prod}
                </li>
              ))}
            </ul>
          </div>

          <div className="h-px bg-gray-700 my-6"></div>

          <Link to="/locations" onClick={onClose} className="block text-xl">Location of Store</Link>
          <Link to="/catalog" onClick={onClose} className="block text-xl">Catalogue</Link>
          <Link to="/contact" onClick={onClose} className="block text-xl">Contact Us</Link>
          <Link to="/admin" onClick={onClose} className="block text-xl text-[#F08804] font-bold mt-4">Admin Dashboard</Link>
        </div>

        <div className="p-8 text-sm text-gray-400">
          <p>© 2026 Abiramy Agency Parryware</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;