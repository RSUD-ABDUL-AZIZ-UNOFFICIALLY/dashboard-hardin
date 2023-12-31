'use client'
import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Input } from "@nextui-org/react";
import moment from 'moment';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { CircularProgress } from "@nextui-org/react";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const ChartKunjunganPasien = ({ api, title, height }) => {
    const base_url = process.env.base_url
    const today = moment()
    const [dateStart, setDateStart] = useState(today.format('YYYY-MM-DD'))
    const [dateEnd, setDateEnd] = useState(today.format('YYYY-MM-DD'))
    const [record, setRecord] = useState(null)
    const [iniLabel, setLabel] = useState([])


    const getData = async () => {
        const token_api = localStorage.getItem('token_api')
        let listColor = []
        let listLabel = []
        try {
            const response = await axios.get(`${base_url}${api}?from=${dateStart}&until=${dateEnd}`, {
                headers: {
                    'Authorization': 'Bearer ' + token_api
                }
            })
            if (response.data.data) {
                setRecord(response.data.data)

                const labels = response.data.data.poliklinik.map((item) => item.poliklinik);
                setLabel(labels);
                for (let i = 0; i < response.data.data.poliklinik.length; i++) {
                    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

                    listColor.push(randomColor)
                }

                setChartColor(listColor)
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
                // display: true,
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
                // display: true,
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
            // ... konfigurasi lainnya ...
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
                label: "Kunjungan",
                data:
                    record ? record.poliklinik.map((item) => item.totalKunjungan
                    ) : []
                ,
                backgroundColor: 'rgb(75, 192, 192)',
                stack: 'Stack 0',

            },
        ],
    };
    return (
        <React.Fragment>
            <div className="w-full h-full">
                <div className="flex justify-center">
                    <div className="text-center uppercase bg-[#00bb9b] p-3 w-full text-white shadow-lg">{title}</div>
                </div>

                {record ?
                    <React.Fragment>
                        <div className="lg:md:flex p-2 animasi-topToBottom">
                            <div className="lg:md:flex justify-start p-2 gap-2">
                                <div className="gap-2 items-center w-full lg:md:mb-0 mb-2">
                                    <label className='text-sm text-black' htmlFor="">Dari Tanggal</label>
                                    <input className='p-2 shadow-md rounded-lg w-full bg-white text-[#00bb9b]' value={dateStart} onChange={(e) => setDateStart(e.target.value)} type="date" />
                                </div>
                                <div className="gap-2 items-center w-full">
                                    <label className='text-sm text-black' htmlFor="">Hingga Tanggal</label>
                                    <input className=' p-2 shadow-md rounded-lg w-full bg-white text-[#00bb9b]' value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} type="date" />
                                </div>
                            </div>
                            <div className="flex lg:w-auto h-full w-full gap-2 justify-start items-center text-[#00bb9b] overflow-hidden overflow-x-scroll lg:md:pt-2">
                                <div className="flex gap-2 lg:md:m-0 h-full md:sm:pb-2">
                                    <div className="p-3 w-32 shadow-md rounded-lg h-full flex justify-center items-center bg-[#ffee59] text-black">
                                        Total : {record.allrecord}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="">
                            <div className='h-full w-full flex justify-center p-2'>
                                {/* <canvas height={200} width={200}> */}
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
                                        height={height}
                                    />
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                    :
                    <div className="min-h-[50vh] w-full flex justify-center items-center">
                        <CircularProgress color="success" aria-label="Loading..." />
                    </div>
                }
            </div >
        </React.Fragment >
    )
}

export default ChartKunjunganPasien