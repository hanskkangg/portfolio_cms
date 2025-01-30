import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
      if (response.data.success) {
        // Reverse to show latest orders first
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } });
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen p-6">
      <h3 className="text-xl font-semibold mb-4">Order Page</h3>

      <div>
        {currentOrders.map((order, index) => (
          <div
            className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 dark:border-gray-700 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-lg shadow-lg'
            key={index}
          > 
          
          <div className="flex items-center gap-3">
          <img
            className="w-16 h-16 object-cover rounded-md border dark:border-gray-600"
            src={order.items[0].image[0]} 
            alt={order.items[0].name}
          /></div>

            {/* Customer Details */}
            <div>
              {order.items.map((item, idx) => (
                <p className='py-0.5' key={idx}>
                  {item.name} x {item.quantity} <span>{item.size}</span>
                </p>
              ))}

              <p className='mt-3 mb-2 font-medium'>{order.address.firstName + ' ' + order.address.lastName}</p>
              <p className='mb-2'>{order.address.email}</p>
              <div>
                <p>{order.address.street + ','}</p>
                <p>{order.address.city + ', ' + order.address.state + ', ' + order.address.country + ', ' + order.address.zipcode}</p>
              </div>
              <p className='mt-1'>{order.address.phone}</p>
            </div>

            {/* Order Information */}
           {/* Order Information */}
<div>
  <p className='text-sm sm:text-[15px]'><span className="font-bold">Items:</span> {order.items.length}</p>
  <p className='mt-3'><span className="font-bold">Method:</span> {order.paymentMethod}</p>
  <p><span className="font-bold">Payment:</span> {order.payment ? 'Paid' : 'Pending'}</p>
  <p><span className="font-bold">Date:</span> {new Date(order.date).toLocaleDateString()}</p>

              {/* ✅ Special Note Section (if available) */}
              {order.address.specialNote && (
                <p className='mt-2 text-sm text-gray-600 dark:text-gray-400 italic'>
                  <strong>Special Note:</strong> {order.address.specialNote}
                </p>
              )}
            </div>

            {/* Order Amount */}
            <p className='text-sm sm:text-[15px] font-semibold'>
              {currency} {order.amount}
            </p>

            {/* Order Status Dropdown */}
            <select 
              onChange={(event) => statusHandler(event, order._id)} 
              value={order.status} 
              className='p-2 font-semibold bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700 rounded-md'
            >
              <option value='Order Placed'>Order Placed</option>
              <option value='Packing'>Packing</option>
              <option value='Shipped'>Shipped</option>
              <option value='Out for delivery'>Out for delivery</option>
              <option value='Delivered'>Delivered</option>
            </select>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className='flex justify-center mt-6'>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 mx-1 border rounded-md ${currentPage === index + 1 ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black dark:bg-gray-700 dark:text-white'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Orders;
