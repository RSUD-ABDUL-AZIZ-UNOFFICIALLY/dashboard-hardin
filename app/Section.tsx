'use client'
import React from 'react'
import ChartDaily from './Component/Home/ChartDaily'
import ChartKunjungan from './Component/Home/ChartKunjungan'

const Section = () => {
    return (
        <div className='section'>
            <div className="grid gap-4 ">
                <div className="h-full lg:w-[50vw] shadow-sm rounded-lg bg-white p-3">
                    <ChartDaily />
                </div>
                {/* <div className="flex gap-2"> */}
                <div className="flex gap-4 overflow-hidden overflow-x-scroll">
                    <div className="lg:w-2/5">
                        <div className="flex shadow-sm h-full rounded-lg bg-[#00bb9c13]">
                            <ChartKunjungan />
                        </div>
                    </div>
                    <div className="lg:w-2/5">
                        <div className="flex shadow-sm h-full rounded-lg bg-[#00bb9c13]">
                            <ChartKunjungan />
                        </div>
                    </div>
                    <div className="lg:w-2/5">
                        <div className="flex shadow-sm h-full rounded-lg bg-[#00bb9c13]">
                            <ChartKunjungan />
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div>
        </div>
    )
}

export default Section