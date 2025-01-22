// Import React library to create React components
import React from 'react'

// Import Routes and Route from react-router-dom to handle page navigation
import { Routes, Route } from 'react-router-dom'

// Import the Home component from the pages folder
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrders'
import Orders from './pages/Orders'
import NavBar from './components/NavBar'
import Footer from './components/Footer'





const App = () => {
  return (

    // This div adds padding to the page for different screen sizes
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'> 

        {/* using self closing tag for navigation */}
        <NavBar />
          

        {/* Define the routes for the application */}
        <Routes> 

            {/* Set the default route "/" to show the Home component */}
            <Route path='/' element={<Home/>}/> 
            <Route path='/collection' element={<Collection/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/product/:productId' element={<Product/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/place-order' element={<PlaceOrder/>}/>
            <Route path='/orders' element={<Orders/>}/>

        </Routes>

            <Footer/>
        
    </div>
  )
}

// Export the App component so it can be used in other files
export default App
