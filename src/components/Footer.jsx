import React from 'react';

const SocialIcon = ({ path }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
  </svg>
);

const socialPaths = [
  "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", // Facebook
  "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M5 22h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H5C3.9 2 3 2.9 3 4v16c0 1.1.9 2 2 2z", // Instagram (approximated paths)
  "M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z", // Twitter
  "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z M9.75 15.02l5.75-3.27-5.75-3.27v6.54z" // Youtube
];

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Social Links like Hindware reference */}
        <div className="flex flex-col items-center justify-center mb-16 space-y-8">
          <h3 className="text-2xl font-serif tracking-widest font-light">parryware</h3>
          <div className="flex items-center gap-6">
            {socialPaths.map((path, idx) => (
              <div key={idx} className="w-10 h-10 rounded-full border border-cozy-800 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer">
                <SocialIcon path={path} />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 text-sm font-light mb-16">
          
          <div className="space-y-4">
            <h4 className="font-medium text-white mb-6">Explore By Brands</h4>
            <ul className="space-y-3 text-cozy-300">
              <li className="hover:text-white cursor-pointer transition-colors">Parryware Italian Collection</li>
              <li className="hover:text-white cursor-pointer transition-colors">Parryware Smart Appliances</li>
              <li className="hover:text-white cursor-pointer transition-colors">Truflo By Parryware</li>
              <li className="hover:text-white cursor-pointer transition-colors">Benelave By Parryware</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-white mb-6">Explore By Categories</h4>
            <ul className="space-y-3 text-cozy-300">
              <li className="hover:text-white cursor-pointer transition-colors">Bathware</li>
              <li className="hover:text-white cursor-pointer transition-colors">Tiles & Surfaces</li>
              <li className="hover:text-white cursor-pointer transition-colors">Kitchen Appliances</li>
              <li className="hover:text-white cursor-pointer transition-colors">Home Appliances</li>
            </ul>
            
            <h4 className="font-medium text-white mb-6 mt-8">Explore By Space</h4>
            <ul className="space-y-3 text-cozy-300">
              <li className="hover:text-white cursor-pointer transition-colors">Bathroom</li>
              <li className="hover:text-white cursor-pointer transition-colors">Kitchen</li>
            </ul>
          </div>

          <div className="space-y-4">
            <ul className="space-y-6 text-white font-medium">
              <li className="hover:text-cozy-300 cursor-pointer transition-colors">Institutional Business</li>
              <li className="hover:text-cozy-300 cursor-pointer transition-colors">International Business</li>
              <li className="hover:text-cozy-300 cursor-pointer transition-colors">Parryware Experience Center</li>
              <li className="hover:text-cozy-300 cursor-pointer transition-colors">Store Locator</li>
              <li className="hover:text-cozy-300 cursor-pointer transition-colors">Explore Catalogue</li>
              <li className="hover:text-cozy-300 cursor-pointer transition-colors">IoT Devices</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-white mb-6">Customer Support</h4>
            <ul className="space-y-3 text-cozy-300">
              <li className="hover:text-white cursor-pointer transition-colors">Service & Support</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">Warranty & Return Policy</li>
            </ul>
          </div>

          <div className="space-y-4 text-cozy-300">
             <h4 className="font-medium text-white mb-6">Other Links</h4>
            <ul className="space-y-3 text-cozy-300">
              <li className="hover:text-white cursor-pointer transition-colors">About Parryware</li>
              <li className="hover:text-white cursor-pointer transition-colors">Blogs</li>
              <li className="hover:text-white cursor-pointer transition-colors">Certifications</li>
              <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Terms & Conditions</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-cozy-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-cozy-500">
          <p>Copyright © Abiramy Agency Parryware Limited. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
