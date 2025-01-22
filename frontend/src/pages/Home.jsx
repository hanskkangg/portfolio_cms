import React from 'react'

{/* Whenever we open home we import the hero component */}
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'

const Home = () => {
  return (
    <div>

      {/* Whenever we open home we import the hero component */}  
      <Hero/>
      <LatestCollection/>
      <BestSeller/>
    </div>
  )
}

export default Home