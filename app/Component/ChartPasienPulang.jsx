'use client'
import React, { useState, useEffect, useRef } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import moment from 'moment';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

import { CircularProgress } from "@nextui-org/react";
import Bangsal from './ChartPasienPulang/Bangsal';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const ChartPasienPulang = ({ title }) => {
    const base_url = process.env.base_url
    const today = moment()
    const [dateEnd, setDateEnd] = useState(today.format('YYYY-MM-DD'))
    const [dateStart, setDateStart] = useState(today.subtract(1, 'days').format('YYYY-MM-DD'))
    const [record, setRecord] = useState(null)
    const [iniLabel, setLabel] = useState([])

    const scrollableRef = useRef(null);

    const scrollHorizontal = (e) => {
        if (scrollableRef.current) {
            scrollableRef.current.scrollLeft += e;
        }
    };


    const getData = async () => {
        const token_api = localStorage.getItem('token_api')
        try {
            const response = await axios.get(`${base_url}/api/dashboard/regranap/pulang?from=${dateStart}&until=${dateEnd}`, {

                headers: {
                    'Authorization': 'Bearer ' + token_api
                }
            })
            if (response.data.data) {
                setRecord(response.data)
                const labels = response.data.data.map((item) => item.kd_bangsal);
                setLabel(labels);
            }

        } catch (error) {

        }
    }

    useEffect(() => {
        getData()
    }, [dateStart, dateEnd])

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
        ChartDataLabels

    );

    const options = {
        plugins: {
            title: {
                text: 'Chart.js Bar Chart - Stacked',
            },
            datalabels: {
                display: true,
                color: "black",
                align: "end",
                padding: {
                    // right: 2
                },
                anchor: 'end',
                font: {
                    size: 14
                },
            }
        },
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        layout: {
            padding: 5,
        },
        animation: {

        }
    };
    const options2 = {
        plugins: {
            title: {
                text: 'Chart.js Bar Chart - Stacked',
            },
            datalabels: {
                display: false,
                color: "black",
                align: "end",
                padding: {
                    // right: 2
                },
                anchor: 'end',
                font: {
                    size: 14
                },
            }
        },
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        indexAxis: 'y',
        scales: {
            y: {
                stacked: true,
            },
        },
        layout: {
            padding: 5,
        },
        animation: {

        }
    };
    const labels = iniLabel;

    const data = {
        labels,
        datasets: [
            {
                label: "Sudah Pulang",
                data:
                    record ? record.data.map((item) => item.pasien
                    ) : []
                ,
                backgroundColor: 'rgb(75, 192, 192)',
                stack: 'Stack 0',
            }

        ],
    };

    return (
        <React.Fragment>
            <div className="w-full h-full">
                <div className="flex justify-center">
                    <div className="text-center uppercase w-full bg-[#00bb9b] p-3 text-white shadow-lg">{title}</div>
                </div>
                {/* <canvas height={200} width={200}> */}
                {record ?
                    <React.Fragment>
                        <div className="lg:md:flex animasi-topToBottom p-2">
                            <div className="lg:md:flex justify-start p-2 gap-2">
                                <div className="gap-2 items-center w-full lg:md:mb-0 mb-2">
                                    <label className='text-sm text-black' htmlFor="">Dari Tanggal</label>
                                    <input className=' p-2 shadow-md rounded-lg w-full bg-white text-[#00bb9b]' value={dateStart} onChange={(e) => setDateStart(e.target.value)} type="date" />
                                </div>
                                <div className="gap-2 items-center w-full">
                                    <label className='text-sm text-black' htmlFor="">Hingga Tanggal</label>
                                    <input className=' p-2 shadow-md rounded-lg w-full bg-white text-[#00bb9b]' value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} type="date" />
                                </div>
                            </div>
                            <div className="flex lg:w-auto h-full w-full gap-2 justify-start items-center text-[#00bb9b] overflow-hidden overflow-x-scroll lg:md:pt-2">
                                <div className="flex gap-2 lg:md:m-0 h-full md:sm:pb-2">
                                    <div className="p-3 w-32 shadow-md rounded-lg h-full flex justify-center items-center bg-[#ffee59] text-black">
                                        Total : {record.record}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:grid lg:grid-cols-7 h-full">
                            <div className='lg:col-span-3 h-full w-full flex justify-center p-2'>
                                <div className="lg:hidden block w-full">
                                    <Bar
                                        // options={options2}
                                        options={options2}
                                        data={data}
                                        // width={auto}
                                        height={400}
                                    />
                                </div>
                                <div className="lg:block hidden w-full">
                                    <Bar
                                        options={options}
                                        data={data}
                                        // width={400}
                                        height={220}
                                    />
                                </div>
                            </div>
                            <div className='lg:col-span-4 h-full overflow-hidden '>
                                <div className="flex scroll-smooth overflow-x-scroll" ref={scrollableRef}>
                                    <div className="flex gap-3 h-full p-4">
                                        {record && record.data &&
                                            record.data.map((item, index) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <Bangsal title={item.kd_bangsal} index={item.pasien} data={item.data} />
                                                    </React.Fragment>
                                                )
                                            })}
                                    </div>
                                </div>
                                <div className="flex gap-2  mt-3 p-2">
                                    <button onClick={() => scrollHorizontal(-500)} className='duration-75 active:scale-95 shadow-md p-3 rounded-xl'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                        </svg>
                                    </button>
                                    <button onClick={() => scrollHorizontal(500)} className='duration-75 active:scale-95 shadow-md p-3 rounded-xl'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </React.Fragment>

                    :
                    <div className="min-h-[40vh] w-full flex justify-center items-center">
                        <CircularProgress color="success" aria-label="Loading..." />
                    </div>

                }

            </div >
        </React.Fragment >
    )
}

export default ChartPasienPulang