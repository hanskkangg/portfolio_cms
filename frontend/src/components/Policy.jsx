import React from 'react'
import { assets } from '../assets/assets'

const Policy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>


        {/* return policy */}
        <div>
            <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt='Return Policy Icon' />
            <p className ='font-semibold'>Return Policy</p>
            <p className='text-gray-400'>Nokia today announced that it has acquired Rapid’s technology assets, including the world’s largest API marketplace, and its highly skilled team. </p>
        </div>


        {/* exchange policy */}
        <div>
            <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt='Return Policy Icon' />
            <p className ='font-semibold'>Exchange Policy</p>
            <p className='text-gray-400'>Nokia today announced that it has acquired Rapid’s technology assets, including the world’s largest API marketplace, and its highly skilled team. </p>
        </div>


        <div>
            <img src={assets.support_img} className='w-12 m-auto mb-5' alt='Return Policy Icon' />
            <p className ='font-semibold'>Customer Support</p>
            <p className='text-gray-400'>Nokia today announced that it has acquired Rapid’s technology assets, including the world’s largest API marketplace, and its highly skilled team. </p>
        </div>


    </div>
  )
}

export default Policy