'use client'
import React from 'react'
import ChartProsesPelayanan from '../../Component/ChartProsesPelayanan'
import ChartKunjunganPasien from '../../Component/ChartKunjunganPasien'
import ChartAsuransi from '../../Component/ChartAsuransi'
const Section = () => {
    return (
        <div className='section mb-3'>
            <div className="lg:flex lg:gap-3">
                <div className="lg:w-[70vw] lg:border lg:border-[#00bb9b]">
                    <ChartProsesPelayanan />
                </div>
                <div className="lg:w-[30vw] lg:border lg:border-[#00bb9b]">
                    <ChartAsuransi
                        title={'Asuransi Rawat'}
                        api={`/api/dashboard/reg/asuransi/ralan`}

                    />
                </div>
            </div>
            <div className="lg:w-[100vw] h-full bg-[#ffffff]">
                <ChartKunjunganPasien
                    title={'Kunjungan Pasien'}
                    api={`/api/dashboard/reg/reports/ralan`}
                    height={80} />
            </div>
        </div>
    )
}

export default Section