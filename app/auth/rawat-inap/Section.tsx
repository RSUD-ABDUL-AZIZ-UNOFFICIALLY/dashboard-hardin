'use client'
import React from 'react'
import ChartAsuransi from '../../Component/ChartAsuransi'
import ChartKunjunganPasien from '../../Component/ChartKunjunganPasien'
import ChartPasienPulang from "../../Component/ChartPasienPulang";
import ChartPasienBelumPulang from "../../Component/ChartPasienBelumPulang";
const Section = () => {
    const base_url = process.env.base_url
    return (
        <div className='section'>
            <div className="lg:flex lg:gap-3 mb-3">
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
            <div className="lg:flex lg:gap-3">
                <div className="lg:w-[50vw] lg:border lg:border-[#00bb9b]">
                    {/* <ChartKunjunganPasien
                        title={'Kunjungan Pasien'}
                        api={`/api/dashboard/reg/reports/ranap`}
                        height={''} /> */}
                    <ChartPasienPulang title={'Pasien Sudah Pulang'} />
                </div>
                <div className="lg:w-[50vw] lg:border lg:border-[#00bb9b]">
                    {/* <ChartKunjunganPasien
                        title={'Kunjungan Pasien'}
                        api={`/api/dashboard/reg/reports/ranap`}
                        height={''} /> */}
                    <ChartPasienBelumPulang title={'Pasien Belum Pulang'} />
                </div>
            </div>
        </div>
    )
}

export default Section