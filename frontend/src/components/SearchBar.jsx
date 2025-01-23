import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext'; // Import global ShopContext
import { assets } from '../assets/assets'; // Import icons/images
import { useLocation } from 'react-router-dom'; // Import useLocation to get the current URL path

const SearchBar = () => {
    // Get values from ShopContext
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);

    // State to check if search bar should be visible
    const [visible, setVisible] = useState(false);

    // Get the current page location (URL path)
    const location = useLocation();

    // Check if the current page is "collection" and show the search bar
    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true); // Show search bar on collection page
        } else {
            setVisible(false); // Hide search bar on other pages
        }
    }, [location]); // Run this effect when the location changes

    return showSearch && visible ? ( // Only show search bar if showSearch is true and visible is true
        <div className='border-t border-b bg-gray-50 text-center'>


            {/* Search input box */}
            <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
                <input 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    className='flex-1 outline-none bg-inherit text-sm' 
                    type="text" 
                    placeholder='Search'
                />
                <img className='w-4' src={assets.search_icon} alt="Search Icon" />
            </div>
            {/* Close (X) button to hide search bar */}
            <img 
                onClick={() => setShowSearch(false)} 
                className='inline w-3 cursor-pointer' 
                src={assets.cross_icon} 
                alt="Close Icon" 
            />
        </div>
    ) : null; 
}

export default SearchBar;
