import React, { useContext, useState } from 'react'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets' 
import { ShopContext } from '../context/ShopContext'
import axios from 'axios' // Import axios for API requests
import { toast } from 'react-toastify' 
import Title from '../components/Title'; 



const PlaceOrders = () => {


    // State to store selected payment method (default is COD - Cash on Delivery)
    const [method, setMethod] = useState('cod'); 

    // Accessing global state from ShopContext
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

    // State to store user input for delivery information
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    });

    // Function to update form data when user types in an input field
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(data => ({ ...data, [name]: value }));
    };

    // Function to initialize Razorpay payment
    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Order Payment',
            description: 'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response);
                try {


                    // Verify payment on the backend
                    const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { token } });
                    if (data.success) {

                        // Redirect to orders page
                        navigate('/orders');
                        // Clear cart after successful order
                        setCartItems({}); 
                    }
                } catch (error) {
                    console.log(error);
                    toast.error(error);
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    // Function to handle form submission (placing the order)
    const onSubmitHandler = async (event) => {
         // Prevent page reload on form submission
        event.preventDefault();
        try {
            let orderItems = [];

            // Loop through cart items and prepare order data
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items));
                        if (itemInfo) {
                            itemInfo.size = item;
                            itemInfo.quantity = cartItems[items][item];
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }

            // Prepare order data
            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            };

            // Handle different payment methods
            switch (method) {

                // If payment method is Cash on Delivery
                case 'cod': 
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
                    if (response.data.success) {
                        // Clear cart after successful order
                        setCartItems({}); 
                        // Redirect to orders page
                        navigate('/orders'); 
                    } else {
                        toast.error(response.data.message);
                    }
                    break;


                    // If payment method is Stripe
                case 'stripe': 
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } });
                    if (responseStripe.data.success) {
                        const { session_url } = responseStripe.data;
                        // Redirect to Stripe payment page
                        window.location.replace(session_url); 
                    } else {
                        toast.error(responseStripe.data.message);
                    }
                    break;

                    // If payment method is Razorpay
                case 'razorpay': 
                    const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } });
                    if (responseRazorpay.data.success) {
                         // Start Razorpay payment
                        initPay(responseRazorpay.data.order);
                    }
                    break;

                default:
                    break;
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        // Form for placing an order
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            
            {/*Left Side - Delivery Information */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

                {/* Section title */}
                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>

                {/* Input fields for user details */}
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
                </div>
                <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' />
                <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
                
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
                    <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
                </div>

                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
                    <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
                </div>
                
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
            </div>

            {/*Right Side - Payment Information*/}
            <div className='mt-8'>

                {/* Order total section */}
                <div className='mt-8 min-w-80'>
                    <CartTotal />
                </div>
{/* Payment method selection */}
<div className='mt-12'>
    <Title text1={'PAYMENT'} text2={'METHOD'} />
    
    <div className='flex gap-3 flex-col lg:flex-row'>
        {/* Stripe payment option */}
        <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
            <img className='h-5 mx-4' src={assets.stripe_logo} alt="Stripe Payment" />
        </div>

        {/* Razorpay payment option */}
        <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
            <img className='h-5 mx-4' src={assets.razorpay_logo} alt="Razorpay Payment" />
        </div>

        {/* Cash on Delivery (COD) option */}
        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
        </div>
    
</div>


                    {/* Place Order button */}
                    <div className='w-full text-end mt-8'>
                        <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrders;
