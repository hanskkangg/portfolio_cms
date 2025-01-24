import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsLetter'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='mt-10 mb-20 flex flex-col md:flex-row gap-20'>
          <img className='w-full md:max-w-[450px]' src={assets.about_us} alt="" />
          <div className='flex flex-col gap-6 md:w-2/4 text-gray-600'>

          <b className='text-gray-800'>Our Story</b>
              <p>Like A Hummingbird Angry But Alive Love Me Well Burning Feathers Dust It Off
              </p>

              <p>LUQMAN AJMAL Institute is a self- financial co-education institute dedicated to the training of medical and Vocational Training related courses.LUQMAN AJMAL Institute is a self- financial co-education institute dedicated to the training of medical and Vocational Training related courses.</p>


              <b className='text-gray-800'>Our Mission</b>
              <p>Our A mission statement summarizes why a business exists and helps a company respond to change and make decisions that align with its visionA mission statement summarizes why a business exists and helps a company respond to change and make decisions that align with its visionA mission statement summarizes why a business exists and helps a company respond to change and make decisions that align with its vision</p>
          </div>
      </div>

      <div className=' text-2xl py-4 text-center'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className=' text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
            <p className=' text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <p className=' text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
          </div>
      </div>

      <NewsletterBox/>
      
    </div>
  )
}

export default About
