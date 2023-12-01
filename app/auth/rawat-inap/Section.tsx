'use client'
import React from 'react'
import ChartAsuransi from '../../Component/ChartAsuransi'
import ChartKunjunganPasien from '../../Component/ChartKunjunganPasien'
import ChartPasienPulang from "../../Component/ChartPasienPulang";
import ChartPasienBelumPulang from "../../Component/ChartPasienBelumPulang";
const Section = () => {
    return (
        <div className='section'>
            <div className="lg:flex mb-3">
                <div className="lg:w-[70vw] lg:border lg:border-[#00bb9b]">
                    <ChartKunjunganPasien
                        title={'Kunjungan Pasien'}
                        api={`/api/dashboard/reg/reports/ranap`}
                        height={''} />
                </div>
                <div className="lg:w-[30vw] lg:border lg:border-[#00bb9b]">
                    <ChartAsuransi
                        title={'Asuransi Rawat Inap'}
                        api={`/api/dashboard/reg/asuransi/ranap`}

                    />
                </div>
            </div>
            <div className="w-full lg:gap-3 h-full mb-3">
                <div className="lg:border h-full lg:border-[#00bb9b]">
                    <ChartPasienPulang title={'Pasien Sudah Pulang'} />
                </div>
            </div>
            <div className="lg:flex lg:gap-3 h-full">
                <div className="lg:w-[50vw] lg:border w h-full lg:border-[#00bb9b]">
                    <ChartPasienBelumPulang title={'Pasien Belum Pulang'} />
                </div>
            </div>
        </div>
    )
}

export default Section