import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    price: '',
    image1: null,
    image2: null,
    image3: null,
    image4: null
  });

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Open Edit Modal
  const openEditModal = (product) => {
    setSelectedProduct(product);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price,
      image1: null,
      image2: null,
      image3: null,
      image4: null
    });
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Handle Image Change
  const handleImageChange = (e, imageKey) => {
    setEditForm({ ...editForm, [imageKey]: e.target.files[0] });
  };

  // Submit Updated Product
  const submitUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("id", selectedProduct._id);
      formData.append("name", editForm.name);
      formData.append("description", editForm.description);
      formData.append("price", editForm.price);

      if (editForm.image1) formData.append("image1", editForm.image1);
      if (editForm.image2) formData.append("image2", editForm.image2);
      if (editForm.image3) formData.append("image3", editForm.image3);
      if (editForm.image4) formData.append("image4", editForm.image4);

      const response = await axios.post(backendUrl + "/api/product/update", formData, { headers: { token } });

      if (response.data.success) {
        toast.success("Product updated successfully!");
        fetchList();
        setSelectedProduct(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>

        {/* List Table */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Actions</b>
        </div>

        {list.map((item, index) => (
          <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
            <img className='w-12' src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <button onClick={() => openEditModal(item)} className='bg-blue-500 text-white px-3 py-1 text-sm'>Edit</button>
            <button onClick={() => removeProduct(item._id)} className='bg-red-500 text-white px-3 py-1 text-sm'>Delete</button>
          </div>
        ))}

      </div>

      {/* Edit Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-md w-96">
            <h2 className="text-lg font-bold mb-3">Edit Product</h2>
            <input type="text" name="name" value={editForm.name} onChange={handleInputChange} className="w-full p-2 border mb-2" />
            <textarea name="description" value={editForm.description} onChange={handleInputChange} className="w-full p-2 border mb-2"></textarea>
            <input type="number" name="price" value={editForm.price} onChange={handleInputChange} className="w-full p-2 border mb-2" />
            <input type="file" onChange={(e) => handleImageChange(e, "image1")} className="w-full mb-2" />
            <button onClick={submitUpdate} className="bg-green-500 text-white px-4 py-2">Update</button>
            <button onClick={() => setSelectedProduct(null)} className="ml-3 bg-gray-500 text-white px-4 py-2">Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default List;
