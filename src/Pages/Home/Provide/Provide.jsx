import React from 'react'
import liveTracking from "../../../assets/live-tracking.png"
import safeDelivery from "../../../assets/safe-delivery.png"

function Provide() {
    return (
        <div className='lg:mt-24 mt-12 space-y-6 p-2'>
            <div className="divider"></div>

            <div className=' bg-white flex items-center gap-6 mt-10 rounded-2xl justify-between flex-col lg:flex-row p-8'>
                <div>
                    <img src={liveTracking} alt="" />
                </div>
                <div>
                    <h1 className='text-lg font-semibold'>Live Parcel Tracking</h1>
                    <p>Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.</p>
                </div>
            </div>

            <div className='bg-white flex items-center gap-6 rounded-2xl justify-between flex-col lg:flex-row p-8'>
                <div>
                    <img src={safeDelivery} alt="" />
                </div>
                <div>
                    <h1 className='text-lg font-semibold'>100% Safe Delivery</h1>
                    <p>We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.</p>
                </div>
            </div>

            <div className='bg-white flex items-center gap-6 rounded-2xl justify-between flex-col lg:flex-row p-8'>
                <div>
                    <img src={safeDelivery} alt="" />
                </div>
                <div>
                    <h1 className='text-lg font-semibold'>24/7 Call Center Support</h1>
                    <p>Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.</p>
                </div>
            </div>
        </div>
    )
}

export default Provide