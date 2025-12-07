import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
  const companyLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const resourcesLinks = [
    { name: 'How it Works', path: '/how-it-works' },
    { name: 'Offers', path: '/offers' },
    { name: 'Partner with Us', path: '/partner' },
    { name: 'Help Center', path: '/help' },
  ];

  const contactInfo = [
    { icon: '📍', text: 'Street Number-10, Rohini Sector-23, Delhi, India' },
    { icon: '📧', text: 'support@fooddelivery.com' },
    { icon: '📞', text: '+91 1112222334' },
  ];

  return (
    <footer className="bg-slate-800 text-white py-8 md:py-12">
      <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          
          {/* Logo + Description */}
          <div className="flex flex-col gap-3 md:gap-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-1">
            <img
              src="/assets/whiteLogo.png"
              alt="Logo"
              className="w-16 md:w-20 h-auto"
            />
            <p className="text-3xl md:text-5xl font-bold">Tastify</p>
            </div>
            <p className="text-gray-400 text-xs md:text-sm">
              Fast and fresh food delivery from your favorite restaurants.
            </p>
            <div className="flex space-x-4 mt-2">
              {['facebook', 'twitter', 'instagram'].map((social) => (
                <a key={social} href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    {/* placeholder icon, replace with real social icons */}
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Company</h3>
            <ul className="space-y-1 md:space-y-2">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition text-sm md:text-base">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Resources</h3>
            <ul className="space-y-1 md:space-y-2">
              {resourcesLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition text-sm md:text-base">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Contact</h3>
            <ul className="space-y-1 md:space-y-2">
              {contactInfo.map((info, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-400 text-xs md:text-sm">
                  <span>{info.icon}</span>
                  <span>{info.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 md:mt-8 pt-4 md:pt-6 text-center text-gray-400 text-xs md:text-sm">
          © {new Date().getFullYear()} FoodDelivery. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
