import React from 'react';
import { assets } from '../assets/assets';

const Footer = ({ isDarkMode }) => {
  return (
    <div className="mt-20 bg-gray-100 dark:bg-gray-900 py-10 px-5 sm:px-10">
      
      {/* Main Footer Layout */}
      <div className="flex flex-col sm:grid sm:grid-cols-3 gap-8 text-sm text-center sm:text-left">
        
        {/* Logo & Description */}
        <div className="flex flex-col-2 items-center sm:items-start space-y-4 xl:mt-10 lg:mt-10">
          <img  
            src={isDarkMode ? assets.baeyondnail : assets.baeyondnail} 
            className="w-20 transition-all duration-300 mt-4 lg:mt-7 xl:mt-4" 
            alt="Baeyond Nails Logo" 
          />
          <p className="w-full max-w-md text-gray-600 dark:text-gray-300">
            Elevate your beauty with Baeyond Nails. Experience the finest nail artistry.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-xl font-medium mb-3">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600 dark:text-gray-300">
            <li>HOME</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <p className="text-xl font-medium mb-3">CONTACT ME</p>
          <ul className="flex flex-col gap-2 text-gray-600 dark:text-gray-300">
            <li>📞 +1-613-700-3172</li>
            <li>📧 hans.kkang@gmail.com</li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom Section */}
      <div className="mt-10">
        <hr className="border-gray-300 dark:border-gray-700" />
        <p className="py-5 text-sm text-center text-gray-600 dark:text-gray-100 mb-[-15%] md:mb-[-5%] xl:mb-[-3%]
        lg:mb-[-1%]">
          Copyright 2024 © Baeyond Nails - All Rights Reserved.
        </p>
      </div>

    </div>
  );
};

export default Footer;
