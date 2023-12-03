'use client'
import React from 'react'
import ChartProsesPelayanan from '../../Component/ChartProsesPelayanan'
import ChartKunjunganPasien from '../../Component/ChartKunjunganPasien'
import ChartAsuransi from '../../Component/ChartAsuransi'
const Section = () => {
    return (
        <div className='section mb-3'>
            <div className="lg:flex gap-3">
                <div className="lg:w-[70%] bg-[#ffffff] rounded-xl overflow-hidden shadow-lg mb-3">
                    <ChartProsesPelayanan />
                </div>
                <div className="lg:w-[30%] bg-[#ffffff] rounded-xl overflow-hidden shadow-lg mb-3">
                    <ChartAsuransi
                        title={'Asuransi Rawat'}
                        api={`/api/dashboard/reg/asuransi/ralan`}

                    />
                </div>
            </div>
            <div className="lg:w-[100%] h-full bg-[#ffffff] rounded-xl overflow-hidden shadow-lg">
                <ChartKunjunganPasien
                    title={'Kunjungan Pasien'}
                    api={`/api/dashboard/reg/reports/ralan`}
                    height={100} />
            </div>
        </div>
    )
}

export default Section