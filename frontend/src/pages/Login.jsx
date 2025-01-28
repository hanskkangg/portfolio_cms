import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  // State to track whether the user is in "Login" or "Sign Up" mode
  const [currentState, setCurrentState] = useState('Login');

  // Get context values from ShopContext (token, navigation, backend URL)
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  // State to store user input values
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  // Function to handle form submission
  const onSubmitHandler = async (event) => {
    // Prevent page refresh when submitting the form
    event.preventDefault(); 

    try {
      
      if (currentState === 'Sign Up') {
        // If the user is signing up, send a request to the registration API
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        
        if (response.data.success) {

          // Store the token in local storage and set it in the context
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {

          // Show error message
          toast.error(response.data.message);
        }

      } else {
        // If the user is logging in, send a request to the login API
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });

        if (response.data.success) {
          // Store the token in local storage and set it in the context
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          // Show error message
          toast.error(response.data.message); 
        }
      }

    } catch (error) {
      console.log(error);

      // Show error message if fail
      toast.error(error.message);
    }
  };

  // Redirect the user to the home page if they are already logged in
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    // Login/Sign Up Form
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>

        {/* Title with a line */}
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
            <p className='prata-regular text-3xl'>{currentState}</p>
            <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
        </div>

        {/* Show "Name" input only when signing up */}
        {currentState === 'Login' ? '' : 
          <input onChange={(e) => setName(e.target.value)} value={name} 
          type="text" className='w-full px-3 py-2 border border-gray-800' 
          placeholder='Name' required />
        }

        {/* Email Input */}
        <input onChange={(e) => setEmail(e.target.value)} value={email} 
        type="email" className='w-full px-3 py-2 border border-gray-800' 
        placeholder='Email' required />

        {/* Password Input */}
        <input onChange={(e) => setPassword(e.target.value)} value={password} 
        type="password" className='w-full px-3 py-2 border border-gray-800' 
        placeholder='Password' required />

        {/* Links for forgot password & switching between Login/Sign Up */}
        <div className='w-full flex justify-between text-sm mt-[-8px]'>
            <p className='cursor-pointer'>Forgot your password?</p>

            {/* Toggle between Login and Sign Up */}
            {currentState === 'Login' 
              ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
              : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
            }
        </div>

        {/* Submit Button */}
        <button className='bg-black text-white font-light px-8 py-2 mt-4'>
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>

    </form>
  );
}

export default Login;
