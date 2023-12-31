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
import ChartDataLabels from 'chartjs-plugin-datalabels';

const ChartPasienBelumPulang = ({ title }) => {
    const base_url = process.env.base_url
    const [record, setRecord] = useState(null)
    const [iniLabel, setLabel] = useState([])

    const getData = async () => {
        const token_api = localStorage.getItem('token_api')
        try {
            const response = await axios.get(`${base_url}/api/dashboard/regranap/belumpulang`, {
                headers: {
                    'Authorization': 'Bearer ' + token_api
                }
            })
            if (response.data) {
                setRecord(response.data)
                const labels = response.data.data.map((item) => item.kd_bangsal);
                setLabel(labels);
            }

        } catch (error) {

        }
    }

    useEffect(() => {
        getData()

    }, [])

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
                    size: 15
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
                    size: 15
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
                label: "Belum Pulang",
                data:
                    record ? record.data.map((item) => item.belumPulang) : []
                ,
                backgroundColor: 'rgb(75, 192, 192)',
                stack: 'Stack 0',

            },
        ],
    };
    return (
        <React.Fragment>
            <div className="w-full h-full">
                <div className="flex justify-center ">
                    <div className="text-center uppercase w-full bg-[#00bb9b] p-3 text-white shadow-lg">{title}</div>
                </div>
                {record ?
                    <React.Fragment>
                        <div className="lg:md:flex p-2 pt-0 animasi-topToBottom">
                            <div className="flex lg:w-auto w-full gap-2 justify-start items-center text-[#00bb9b] overflow-hidden overflow-x-scroll lg:md:pt-2 lg:md:pb-2">
                                <div className="flex gap-2 lg:md:m-0 m-2 h-full">
                                    <div className="p-3 w-32 shadow-md rounded-lg h-full flex justify-center items-center bg-[#ffee59] text-black">
                                        Total : {record.record}
                                    </div>
                                </div>
                            </div>
                        </div>
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

export default ChartPasienBelumPulang