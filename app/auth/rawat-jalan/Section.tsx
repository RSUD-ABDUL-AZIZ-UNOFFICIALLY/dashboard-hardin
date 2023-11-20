'use client'
import React from 'react'
import ChartProsesPelayanan from './ChartProsesPelayanan'
import ChartKunjunganPasien from './ChartKunjunganPasien'
import ChartAsuransi from './ChartAsuransi'
const Section = () => {
    return (
        <div className='section'>
            <div className="lg:flex lg:gap-3">
                <div className="lg:w-[70vw] lg:border lg:border-[#00bb9b]">
                    <ChartProsesPelayanan />
                </div>
                <div className="lg:w-[30vw] lg:border lg:border-[#00bb9b]">
                    <ChartAsuransi />
                </div>
            </div>
            <div className="lg:w-[100vw] h-full bg-[#fffef2]">
                <ChartKunjunganPasien />
            </div>
        </div>
    )
}

export default Section