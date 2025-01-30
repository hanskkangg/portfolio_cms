import React from 'react';
import { assets } from '../assets/assets';

const Footer = ({ isDarkMode }) => {
  return (
    <div className='mt-40'>
      {/* Main Footer Layout */}
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 text-sm'>
       {/* Logo & Description */}
       <div>
          <img  
            src={isDarkMode ? assets.hans_logo1 : assets.hans_logo2} 
            className='mb-5 w-20 transition-all duration-300' 
            alt="Hans Kang Logo" 
          />
          <p className='w-full md:w-2/3 text-gray-600 dark:text-gray-300'>
            Nokia today announced that it has acquired Rapid’s technology assets, 
            including the world’s largest API marketplace, and its highly skilled team.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600 dark:text-gray-300'>
            <li>HOME</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <p className='text-xl font-medium mb-5'>Contact Me</p>
          <ul className='flex flex-col gap-1 text-gray-600 dark:text-gray-300'>
            <li>+1-613-700-3172</li>
            <li>hans.kkang@gmail.com</li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom Section */}
      <div className='mt-10'>
        <hr className='border-gray-300' />
        <p className='py-5 text-sm text-center text-gray-600 dark:text-gray-100'>
          Copyright 2024 © hans.kang.com - All Rights Reserved.
        </p>
      </div>

    </div>
  );
};

export default Footer;
