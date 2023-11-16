'use client'
import React from 'react'
import ChartDaily from './ChartDaily'
import ChartKunjungan from './ChartKunjungan'
import ChartProsesPelayanan from './ChartProsesPelayanan'

const Section = () => {
    return (
        <div className='section'>
            <div className="p-3 lg:w-[70vw]">
                <ChartProsesPelayanan />
                {/* <ChartDaily /> */}
            </div>
        </div>
    )
}

export default Section