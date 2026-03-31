import { ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div className={`fixed top-0 left-0 h-full w-full max-w-sm bg-cozy-900 text-cozy-50 z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        <div className="flex items-center justify-between p-8 border-b border-cozy-800">
          <span className="text-xl tracking-widest uppercase text-cozy-300">Menu</span>
          <X
            size={32}
            strokeWidth={1.5}
            className="cursor-pointer hover:text-white transition-colors hover:rotate-90 duration-300"
            onClick={onClose}
          />
        </div>

        <div className="flex-1 overflow-y-auto py-8 px-8 space-y-6">
          <div className="group cursor-pointer">
            <div className="flex items-center justify-between text-2xl font-light tracking-wide group-hover:text-cozy-400 transition-colors mb-4">
              Our Products <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </div>
            <ul className="pl-4 space-y-4 text-cozy-200 border-l border-cozy-700/50">
              {['Water Heater', 'Closet', 'Basin', 'Faucets', 'Chimney', 'Tiles and Surface'].map(prod => (
                <li key={prod} className="hover:text-white hover:translate-x-1 cursor-pointer transition-all">{prod}</li>
              ))}
            </ul>
          </div>

          <div className="h-px bg-cozy-800 w-full my-6"></div>

          {['Location of Store', 'Catalogue', 'Contact Us'].map(link => {
            const isCatalogue = link === 'Catalogue' || link === 'Catalog';
            const isContact = link === 'Contact Us';
            const isLocations = link === 'Location of Store';

            if (isContact || isLocations || isCatalogue) {
              let to = "/";
              if (isContact) to = "/contact";
              if (isLocations) to = "/locations";
              if (isCatalogue) to = "/catalog";

              return (
                <Link
                  key={link}
                  to={to}
                  onClick={onClose}
                  className="flex items-center justify-between text-xl font-light tracking-wide cursor-pointer hover:text-cozy-400 hover:translate-x-2 transition-all block"
                >
                  {link}
                </Link>
              );
            }
          })}
        </div>

        <div className="p-8 bg-cozy-900/50 mt-auto border-t border-cozy-800 text-sm text-cozy-400 space-y-2">
          <p>© 2026 Abiramy Agency Parryware</p>
          <p className="hover:text-cozy-300 cursor-pointer">Privacy Policy | Terms</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
