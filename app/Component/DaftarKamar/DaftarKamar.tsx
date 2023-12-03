'use client'
import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import { CircularProgress } from "@nextui-org/react";
import { setTimeout } from 'timers';

const DaftarKamar = () => {
    const [record, setRecord] = useState<any>()
    const base_url = process.env.base_url
    const sectionRef = useRef<any | null>(null)


    const getData = async () => {
        const token_api = localStorage.getItem('token_api')
        try {
            const response = await axios.get(`${base_url}/api/dashboard/regranap/kamar/inap`, {

                headers: {
                    'Authorization': 'Bearer ' + token_api
                }
            })
            if (response.data.data) {
                setRecord(response.data)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getData()
        console.log(sectionRef);

    }, [sectionRef])
    return (
        <div className="p-3 flex justify-center gap-4 w-full flex-wrap">
            {record && record.data.length > 0 ? record.data.map((item: any, index: number) => {
                return (
                    <React.Fragment key={index}>
                        <div ref={sectionRef} className={`bg-white rounded-2xl shadow-lg p-3 lg:w-[23%] md:w-[30%] w-full animasi-popup`}>
                            <div className="flex justify-center text-center items-center">
                                <div className="uppercase text-[#00bb9b] font-bold text-xl">
                                    {item.bangsal}
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-center mt-4 gap-3 p-3">
                                <div className="p-3 w-[40%] text-center rounded-md shadow-md bg-[#ffee59] text-black">Total : {item.total}</div>
                                <div className="p-3 w-[40%] text-center rounded-md shadow-md bg-blue-500 text-white">Terisi : {item.isi}</div>
                                <div className="p-3 w-[40%] text-center rounded-md shadow-md bg-white text-black">Booking : {item.booking}</div>
                                <div className="p-3 w-[40%] text-center rounded-md shadow-md bg-[#00bb9b] text-white">Kosong : {item.kosong}</div>
                            </div>
                        </div>
                    </React.Fragment>
                )
            })
                :
                <React.Fragment>
                    <div className="min-h-[70vh] w-full flex justify-center items-center">
                        <CircularProgress color="success" aria-label="Loading..." />
                    </div>
                </React.Fragment>
            }
        </div>
    )
}

export default DaftarKamar