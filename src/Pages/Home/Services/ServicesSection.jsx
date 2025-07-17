import React from 'react'
import ServicesCard from './ServicesCard'

function ServicesSection() {
  return (
    <div className='lg:mt-24 mt-12 bg-[#03373D] rounded-2xl lg:p-24 md:p-10 sm:p-2'>
        <h1 className='text-center font-bold text-3xl text-white'>Our Services</h1>
        <p className='text-center text-white'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>

        <ServicesCard></ServicesCard>
    </div>
  )
}

export default ServicesSection