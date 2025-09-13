import React from 'react'
import Banner from './Banner/Banner'
import Works from './Works/Works'
import Services from './Services/Services'
import MarqueeBrand from './MarqueeBrand/MarqueeBrand'
import Benefits from './Benefits/Benefits'

function Home() {
  return (
    <div>
      <Banner></Banner>
      <Works></Works>
      <Services></Services>
      <MarqueeBrand></MarqueeBrand>
      <Benefits></Benefits>
    </div>
  )
}

export default Home