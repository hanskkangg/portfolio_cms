import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext'; // Importing ShopContext for global state management
import { assets } from '../assets/assets'; // Importing assets (icons, images, etc.)
import Title from '../components/Title'; // Importing the Title component
import ProductItem from '../components/ProductItem'; // Importing the ProductItem component

const Collection = () => {
  // Extracting products, search term, and search visibility from the global ShopContext
  const { products, search, showSearch } = useContext(ShopContext);

  // State variables
  const [showFilter, setShowFilter] = useState(false); // State to toggle filter visibility
  const [filterProducts, setFilterProducts] = useState([]); // Stores the filtered product list
  const [category, setCategory] = useState([]); // Stores selected product categories
  const [subCategory, setSubCategory] = useState([]); // Stores selected product subcategories
  const [sortType, setSortType] = useState('relavent'); // Stores the selected sorting type



  useEffect(() => {
    window.scrollTo(0, 0); // Instantly move to the top of the page
  }, []);
  
  // Function to toggle category selection
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      // Remove category if already selected
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      // Add category if not selected
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  // Function to toggle subcategory selection
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      // Remove subcategory if already selected
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      // Add subcategory if not selected
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };



  // Function to handle scrolling to the top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to the top
  };

  
  // Function to apply filtering logic based on category, subcategory, and search
  const applyFilter = () => {
    let productsCopy = products.slice(); // Create a copy of the products array to avoid mutating the original data

    // Filter by search term if search is active
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by selected categories
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    // Filter by selected subcategories
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    // Update state with the filtered products
    setFilterProducts(productsCopy);
  };

  // Function to sort products based on the selected sorting option
  const sortProduct = () => {
    let fpCopy = filterProducts.slice(); // Create a copy to avoid mutating the original state

    switch (sortType) {
      case 'low-high':
        // Sort by price: Low to High
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case 'high-low':
        // Sort by price: High to Low
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        // Default: Apply filters again without sorting
        applyFilter();
        break;
    }
  };

  // Effect hook to reapply filters whenever categories, subcategories, search, or products change
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  // Effect hook to re-sort products whenever the sort type changes
  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      {/* Filter Options Section */}
      <div className='min-w-60'>
        {/* Filter Toggle Button */}
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        {/* Category Filter Section */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value="Men" onChange={toggleCategory} /> Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value="Women" onChange={toggleCategory} /> Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value="Kids" onChange={toggleCategory} /> Kids
            </p>
          </div>
        </div>

        {/* SubCategory Filter Section */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value="Topwear" onChange={toggleSubCategory} /> Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value="Bottomwear" onChange={toggleSubCategory} /> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value="Winterwear" onChange={toggleSubCategory} /> Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Product Listing Section */}
      <div className='flex-1'>
        {/* Title and Sorting Dropdown */}
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product Sorting Dropdown */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Display Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Collection;
