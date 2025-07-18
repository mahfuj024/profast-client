import React from 'react'
import Marquee from "react-fast-marquee";
import amazon from "../../../assets/brands/amazon.png"
import casio from "../../../assets/brands/casio.png"
import moonstar from "../../../assets/brands/moonstar.png"
import randstad from "../../../assets/brands/randstad.png"
import start from "../../../assets/brands/start.png"

function Brand() {
    return (
        <div className='lg:mt-24 md:mt-14 mt-12 p-1'>
            <h1 className='text-center font-semibold text-3xl'>We've helped thousands of sales teams</h1>

            <Marquee>
                <div className="flex lg:gap-40 gap-8 items-center mt-11">
                    <img src={amazon} alt="" />
                    <img src={casio} alt="" />
                    <img src={moonstar} alt="" />
                    <img src={randstad} alt="" />
                    <img src={start} alt="" />
                </div>
            </Marquee>
        </div>
    )
}

export default Brand