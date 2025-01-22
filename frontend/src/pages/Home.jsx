import React from 'react'

{/* Whenever we open home we import the hero component */}
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'

const Home = () => {
  return (
    <div>

      {/* Whenever we open home we import the hero component */}  
      <Hero/>

      <LatestCollection/>
    </div>
  )
}

export default Home