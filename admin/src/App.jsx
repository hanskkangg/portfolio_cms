import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditProduct from './pages/editProduct'


// Backend URL and currency constant
export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'

const App = () => {

  // State for storing authentication token
  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');


  // Update local storage when the token changes
  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])

  return (
    <div className='bg-gray-50 min-h-screen'>
    
      {/* Toast notifications container */}
      <ToastContainer />


      {/* Show login page if token is empty, otherwise show main app */}
      {token === ""

        // Show Login component when token is empty
        ? <Login setToken={setToken} />
        : <>

          {/* Navbar component */}
          <Navbar setToken={setToken} />
          <hr />

          {/* Main layout with Sidebar and Content Area */}
          <div className='flex w-full'>

            {/* Sidebar for navigation */}
            <Sidebar />

            {/* Content Area */}
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>


              {/* Routes for different admin pages */}
              <Routes>
  <Route path='/add' element={<Add token={token} />} />
  <Route path='/list' element={<List token={token} />} />
  <Route path='/edit/:productId' element={<EditProduct token={token} />} />
  <Route path='/orders' element={<Orders token={token} />} />
</Routes>

            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App