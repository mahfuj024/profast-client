import RiderImage from "../../assets/agent-pending.png" 

function BeARider() {
    return (
        <div className='min-h-screen mt-4 md:mt-8 bg-white rounded-xl md:rounded-2xl py-6 md:py-10 lg:py-20 px-6 md:px-9 lg:px-28'>
            <div>
                <h2 className='text-2xl md:text-3xl lg:text-5xl font-bold'>
                    Be a Rider
                </h2>

                <p className='mt-3 md:mt-4 lg:mt-6 text-sm md:text-base'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal <br className='hidden md:block' /> packages to business shipments — we deliver on time, every time.</p>

                {/* divider */}
                <hr class="border-t-1 border-[#0000001A] mt-4 md:mt-6 lg:mt-12" />
            </div>

            <div className="hero mt-4 md:mt-6 lg:mt-12">
                <div className="hero-content flex flex-col lg:flex-row justify-between items-center w-full">

                    {/* Text (Left) */}
                    <div className="flex-1 lg:pr-10 text-center lg:text-left">
                        <h1 className="text-2xl md:text-3xl font-bold">Tell us about yourself</h1>
                        
                    </div>

                    {/* Image (Right) */}
                    <div className="flex-1 lg:pl-10 mt-6 lg:mt-0 flex justify-center lg:justify-end">
                        <img
                            src={RiderImage}
                            className="max-w-sm rounded-lg shadow-2xl"
                        />
                    </div>

                </div>
            </div>



        </div>
    )
}

export default BeARider