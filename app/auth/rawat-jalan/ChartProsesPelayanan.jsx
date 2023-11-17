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
import moment from 'moment';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

import { CircularProgress } from "@nextui-org/react";

const ChartProsesPelayanan = () => {
    const base_url = process.env.base_url
    const today = moment()
    const [dateStart, setDateStart] = useState(today.format('YYYY-MM-DD'))
    const [record, setRecord] = useState(null)
    const [iniLabel, setLabel] = useState([])
    const [chartColor, setChartColor] = useState([])

    const getData = async () => {
        const token_api = localStorage.getItem('token_api')
        let listColor = []
        let listLabel = []
        try {
            const response = await axios.get(`${base_url}/api/dashboard/regpoli/daily?tgl_registrasi=${dateStart}`, {
                headers: {
                    'Authorization': 'Bearer ' + token_api
                }
            })
            if (response.data.data) {
                // console.log(response.data.data.poliklinik[0]);
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

    }, [dateStart])

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        plugins: {
            title: {
                // display: true,
                text: 'Chart.js Bar Chart - Stacked',
            },
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
                label: "Sudah",
                data:
                    record ? record.poliklinik.map((item) => item.status.Sudah
                    ) : []
                ,
                backgroundColor: 'rgb(75, 192, 192)',
                stack: 'Stack 0',

            },
            {
                label: 'Batal',
                data:
                    record ? record.poliklinik.map((item) => item.status.Batal
                    ) : []
                ,
                backgroundColor: 'rgb(255, 99, 132)',
                stack: 'Stack 1',
            },
            {
                label: 'Belum',
                data:
                    record ? record.poliklinik.map((item) => item.status.Belum
                    ) : []
                ,
                backgroundColor: 'rgb(53, 162, 235)',
                stack: 'Stack 0',
            },
        ],
    };
    return (
        <React.Fragment>
            <div className="w-full h-full">
                <div className="flex justify-center ">
                    <div className="text-center uppercase w-full bg-[#00bb9b] p-3 text-white shadow-lg">Pelayanan Rawat Jalanan</div>
                </div>
                {/* <canvas height={200} width={200}> */}
                {record ?

                    <React.Fragment>
                        <div className="p-2 flex justify-start">
                            <div className="p-2 grid lg:flex lg:flex-wrap gap-2 items-center w-full">
                                <input className='lg:p-3 p-2 w-full lg:w-auto shadow-md rounded-lg' value={dateStart} onChange={(e) => setDateStart(e.target.value)} type="date" />
                                <div className="flex flex-wrap lg:w-auto w-full gap-2 justify-center h-full items-center text-[#00bb9b]">
                                    <div className="p-3 shadow-md rounded-lg h-full flex justify-center items-center">
                                        Sudah : {record.allrecord.sudah}
                                    </div>
                                    <div className="p-3 shadow-md rounded-lg h-full flex justify-center items-center">
                                        belum : {record.allrecord.belum}
                                    </div>
                                    <div className="p-3 shadow-md rounded-lg h-full flex justify-center items-center">
                                        Batal : {record.allrecord.batal}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div className='h-full w-full flex justify-center p-2'>
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
                                    // height={200}
                                    />
                                </div>
                            </div>
                        </div>
                    </React.Fragment>

                    :
                    <div className="min-h-[30vh] w-full flex justify-center items-center">
                        <CircularProgress color="success" aria-label="Loading..." />
                    </div>

                }

            </div >
        </React.Fragment >
    )
}

export default ChartProsesPelayanan