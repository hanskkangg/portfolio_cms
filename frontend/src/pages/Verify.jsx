import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  
  // Get payment result and order ID from URL
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  
  // Call backend to verify Stripe payment
  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        backendUrl + "/api/order/verifyStripe",
        { success, orderId },
        { headers: { token } }
      );

      
      // If payment is successful, clear cart and go to orders page
      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        
        // If not successful, go back to cart
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  // Run this function if token is available
  useEffect(() => {
    verifyPayment();
  }, [token]);

  // This is a redirect only page
  return <div></div>;
};

export default Verify;
