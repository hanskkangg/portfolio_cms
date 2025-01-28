import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {



  // State to store the list of products
  const [list, setList] = useState([])


  // Function to get the list of products from the backend
  const fetchList = async () => {
    try {

      // Make a GET request to fetch products
      const response = await axios.get(backendUrl + '/api/product/list')


      // If request is successful, update the list state
      if (response.data.success) {
        
        // Reverse to show latest products first
        setList(response.data.products.reverse());
      }
        // Show error message
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }



  // Function to remove a product from the list
  const removeProduct = async (id) => {
    try {

      // Send request to delete a product
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })

      
      // If product is removed successfully, refresh the list
      if (response.data.success) {
         // Show success message
        toast.success(response.data.message)
        // Refresh the list after deletion
        await fetchList();

        // Show error message if deletion fails
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }



  // Fetch product list when the component loads
  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      {/* Page heading */}
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>



        {/* Table Header (only visible on large screens) */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>


        {/* product list and display each product */}

        {
          list.map((item, index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>

                    {/* Product Image */}
              <img className='w-12' src={item.image[0]} alt="" />

                    {/* Product Name */}
              <p>{item.name}</p>

                    {/* Product Category */}
              <p>{item.category}</p>

                    {/* Product Price with Currency Symbol */}
              <p>{currency}{item.price}</p>

                    {/* Remove Button (Clicking deletes the product) */}
              <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
            </div>
          ))
        }

      </div>
    </>
  )
}

export default List