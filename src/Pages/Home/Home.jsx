import React from 'react'
import Banner from './Banner/Banner'
import Worksection from './Work/Worksection'
import ServicesSection from './Services/ServicesSection'
import Brand from './Brand/Brand'
import Provide from './Provide/Provide'

function Home() {
  return (
    <div>
        <Banner></Banner>
        <Worksection></Worksection>
        <ServicesSection></ServicesSection>
        <Brand></Brand>
        <Provide></Provide>
    </div>
  )
}

export default Home