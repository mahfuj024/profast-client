import React from 'react'
import service from "../../../assets/service.png"

function ServicesCard() {
    return (
        <div className='mt-8'>
            <div className="card items-center bg-base-100 max-w-[410px] shadow-sm p-4 space-y-4 hover:bg-[#CAEB66]">
                <figure className="px-10 pt-10">
                    <img
                        src={service}
                        alt="Shoes"
                        className="rounded-xl"/>
                </figure>
                <div className="card-body text-center space-y-4">
                    <p className='text-lg font-semibold '>Express  & Standard Delivery</p>
                    <p>We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.</p>

                </div>
            </div>
        </div>
    )
}

export default ServicesCard