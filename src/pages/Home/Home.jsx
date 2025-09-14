import React from 'react'
import Banner from './Banner/Banner'
import Works from './Works/Works'
import Services from './Services/Services'
import MarqueeBrand from './MarqueeBrand/MarqueeBrand'
import Benefits from './Benefits/Benefits'
import Merchant from './Merchant/Merchant'
import AskedQuestion from './AskedQuestion/AskedQuestion'

function Home() {
  return (
    <div>
      <Banner></Banner>
      <Works></Works>
      <Services></Services>
      <MarqueeBrand></MarqueeBrand>
      <Benefits></Benefits>
      <Merchant></Merchant>
      <AskedQuestion></AskedQuestion>
    </div>
  )
}

export default Home