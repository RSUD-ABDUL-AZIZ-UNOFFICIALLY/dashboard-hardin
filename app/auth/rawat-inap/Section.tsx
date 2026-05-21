'use client'
import React, { useEffect, useRef, useState } from 'react'
import ChartAsuransi from '../../Component/ChartAsuransi'
import ChartKunjunganPasien from '../../Component/ChartKunjunganPasien'
import ChartPasienPulang from "../../Component/ChartPasienPulang";
import ChartPasienBelumPulang from "../../Component/ChartPasienBelumPulang";
import BorChart from "../../Component/BorChart";
import DiagnosaChart from '../../Component/DiagnosaChart';

const Section = () => {
    const sectionRef = useRef<any | null>(null)

    useEffect(() => {
        console.log('ref', sectionRef);
    }, [])
    return (
        <div className='section'>
            <div className="lg:flex gap-3">
                <div ref={sectionRef} className="lg:w-[70%] bg-[#ffffff] rounded-xl overflow-hidden shadow-lg mb-3">
                    <ChartKunjunganPasien
                        title={'Pasen masuk Rawat Inap'}
                        api={`/api/dashboard/reg/reports/ranap`}
                        height={''} />
                </div>
                <div className="lg:w-[30%] bg-[#ffffff] rounded-xl overflow-hidden shadow-lg mb-3">
                    <ChartAsuransi
                        title={'Asuransi Rawat Inap'}
                        api={`/api/dashboard/reg/asuransi/ranap`}

                    />
                </div>
            </div>
            <div className="w-full lg:gap-3 h-full mb-3">
                <div className="bg-[#ffffff] rounded-xl overflow-hidden shadow-lg mb-3">
                    <ChartPasienPulang title={'Pasien Sudah Pulang'} />
                </div>
            </div>
            <div className="lg:flex lg:gap-3 h-full">
                <div className="lg:w-[100%] h-full bg-[#ffffff] rounded-xl overflow-hidden shadow-lg mb-3">
                    <ChartPasienBelumPulang title={'Pasien Belum Pulang'} />
                </div>
            </div>
            <div className="lg:flex gap-1">
                <div className="lg:w-[100%] h-full bg-[#ffffff] rounded-xl overflow-hidden shadow-lg mb-3">
                    <BorChart
                        title={'Indikator Pelayanan Rumah Sakit'}
                    />
                </div>
            </div>
            <div className="lg:flex gap-1">
                <div className="lg:w-[100%] h-full bg-[#ffffff] rounded-xl overflow-hidden shadow-lg mb-3">
                    <DiagnosaChart
                        status_rawat={'ranap'}
                        title={'Diagnosa Pelayanan Rumah Sakit'}
                    />
                </div>
            </div>
        </div>
    )
}

export default Section