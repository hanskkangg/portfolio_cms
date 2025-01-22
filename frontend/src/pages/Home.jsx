import React from 'react'

{/* Whenever we open home we import the hero component */}
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import Policy from '../components/Policy'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <div>

      {/* Whenever we open home we import the hero component */}  
      <Hero/>
      <LatestCollection/>
      <BestSeller/>
      <Policy/>
      <NewsLetter/>
    </div>
  )
}

export default Home