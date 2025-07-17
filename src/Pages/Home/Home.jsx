import React from 'react'
import Banner from './Banner/Banner'
import Worksection from './Work/Worksection'
import ServicesSection from './Services/ServicesSection'

function Home() {
  return (
    <div>
        <Banner></Banner>
        <Worksection></Worksection>
        <ServicesSection></ServicesSection>
    </div>
  )
}

export default Home