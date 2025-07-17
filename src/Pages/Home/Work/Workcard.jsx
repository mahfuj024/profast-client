import React from 'react'
import bookingIcon from "../../../assets/bookingIcon.png"

function Workcard() {
    return (
        <div className='mt-6'>
            <h1 className='text-3xl font-bold'>How it Works</h1>

            <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 justify-items-center mt-6'>
                <div className="card items-start bg-base-100 max-w-[300px] shadow-sm p-4">
                    <figure className="px-10 pt-10">
                        <img
                            src={bookingIcon}
                            alt="Shoes"
                            className="rounded-xl" />
                    </figure>
                    <div className="card-body">
                        <p className='text-lg font-semibold '>Booking Pick & Drop</p>
                        <p>From personal packages to business shipments — we deliver on time, every time.</p>

                    </div>
                </div>

                <div className="card items-start bg-base-100 max-w-[300px] shadow-sm p-4">
                    <figure className="px-10 pt-10">
                        <img
                            src={bookingIcon}
                            alt="Shoes"
                            className="rounded-xl" />
                    </figure>
                    <div className="card-body">
                        <p className='text-lg font-semibold '>Cash On Delivery</p>
                        <p>From personal packages to business shipments — we deliver on time, every time.</p>

                    </div>
                </div>

                <div className="card items-start bg-base-100 max-w-[300px] shadow-sm p-4">
                    <figure className="px-10 pt-10">
                        <img
                            src={bookingIcon}
                            alt="Shoes"
                            className="rounded-xl" />
                    </figure>
                    <div className="card-body">
                        <p className='text-lg font-semibold '>Delivery Hub</p>
                        <p>From personal packages to business shipments — we deliver on time, every time.</p>

                    </div>
                </div>

                <div className="card items-start bg-base-100 max-w-[300px] shadow-sm p-4">
                    <figure className="px-10 pt-10">
                        <img
                            src={bookingIcon}
                            alt="Shoes"
                            className="rounded-xl" />
                    </figure>
                    <div className="card-body">
                        <p className='text-lg font-semibold '>Booking SME & Corporate</p>
                        <p>From personal packages to business shipments — we deliver on time, every time.</p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Workcard