import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const navigate = useNavigate();

  // State to store the list of products
  const [list, setList] = useState([]);

  // Function to get the list of products from the backend
  const fetchList = async () => {
    try {
      // Make a GET request to fetch products
      const response = await axios.get(`${backendUrl}/api/product/list`);

      // If request is successful, update the list state
      if (response.data.success) {
        // Reverse to show latest products first
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Function to remove a product from the list
  const removeProduct = async (id) => {
    try {
      // Send request to delete a product
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );

      // If product is removed successfully, refresh the list
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList(); // Refresh the list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Fetch product list when the component loads
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      {/* Page heading */}
      <p className='mb-2 text-lg font-semibold'>All Products List</p>
      <div className='flex flex-col gap-2'>

        {/* Table Header (only visible on large screens) */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-2 px-3 border bg-gray-100 dark:bg-gray-800 text-sm font-bold text-gray-800 dark:text-gray-200'>
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p className='text-center'>Edit</p>
          <p className='text-center'>Delete</p>
        </div>

        {/* Product list and display each product */}
        {list.map((item, index) => (
          <div
            className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py-2 px-3 border text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200'
            key={index}
          >
            {/* Product Image */}
            <img className='w-14 h-14 object-cover rounded-md border dark:border-gray-600' src={item.image[0]} alt={item.name} />

            {/* Product Name (Clickable to Edit) */}
            <p
              className='cursor-pointer text-blue-500 hover:underline'
              onClick={() => navigate(`/edit/${item._id}`)}
            >
              {item.name}
            </p>

            {/* Product Category */}
            <p>{item.category}</p>

            {/* Product Price with Currency Symbol */}
            <p>{currency}{item.price}</p>

            {/* Edit Button */}
            <button
              onClick={() => navigate(`/edit/${item._id}`)}
              className='bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-md text-sm text-center'
            >
              Edit
            </button>

            {/* Delete Button */}
            <button
              onClick={() => removeProduct(item._id)}
              className='bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-sm text-center'
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
