'use client'
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import moment from 'moment';
import axios from 'axios';
import { CircularProgress } from "@nextui-org/react";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const ChartAsuransi = ({ api, title }) => {
    const base_url = process.env.base_url
    const today = moment()
    const [dateStart, setDateStart] = useState(today.format('YYYY-MM-DD'))
    const [dateEnd, setDateEnd] = useState(today.format('YYYY-MM-DD'))
    const [record, setRecord] = useState(null)
    const [iniLabel, setLabel] = useState([])

    const getData = async () => {
        const token_api = localStorage.getItem('token_api')
        try {
            const response = await axios.get(`${base_url}${api}?from=${dateStart}&until=${dateEnd}`, {
                headers: {
                    'Authorization': 'Bearer ' + token_api
                }
            })
            if (response.data.data) {
                setRecord(response.data.data)

                const labels = response.data.data.penjab.map((item) => item.penjab);
                setLabel(labels);
            }

        } catch (error) {

        }
    }

    ChartJS.register(
        ArcElement,
        Tooltip,
        Legend,
        ChartDataLabels
    );

    useEffect(() => {
        getData()

    }, [dateStart, dateEnd])

    const datasetColor = [
        '#ffd5904A',
        '#90ffd54A',
        '#d590ff4A',
        '#90baff4A',
        '#90ffd54A',
        '#baff904A',
        '#ba90d54A',
        '#ff90d54A',
        '#bad5904A',
    ]
    const datasetColorBorder = [
        '#ffd590',
        '#90ffd5',
        '#d590ff',
        '#90baff',
        '#90ffd5',
        '#baff90',
        '#ba90d5',
        '#ff90d5',
        '#bad590',
    ]

    const options = {
        plugins: {
            title: {
                // display: true,
                text: 'Chart.js Bar Chart - Stacked',
            },
            datalabels: {
                display: false,
                color: "black",

                // align: "end",
                padding: {
                    // right: 2
                },
                // anchor: 'end',
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

    const data = {
        labels: iniLabel,
        datasets: [
            {
                label: "",
                data: record != null ? record.penjab.map((item) => item.totalKunjungan) : [],
                backgroundColor: datasetColor,
                borderColor: datasetColor,
                borderWidth: 1,
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
                        <div className="">
                            <div className="p-2 grid lg:flex lg:flex-wrap md:flex md:flex-wrap gap-2 items-center w-full">
                                <div className="lg:md:grid lg:md:grid-cols-2 justify-start w-full gap-2">
                                    <div className="gap-2 items-center w-full pb-3">
                                        <label className='text-sm text-black' htmlFor="">Dari Tanggal</label>
                                        <input className='lg:p-3 p-2 shadow-md rounded-lg w-full bg-white text-[#00bb9b]' value={dateStart} onChange={(e) => setDateStart(e.target.value)} type="date" />
                                    </div>
                                    <div className=" gap-2 items-center w-full">
                                        <label className='text-sm text-black' htmlFor="">Hingga Tanggal</label>
                                        <input className='lg:p-3 p-2 shadow-md rounded-lg w-full bg-white text-[#00bb9b]' value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} type="date" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex lg:w-auto w-full gap-2 h-full justify-start items-center text-[#00bb9b] overflow-hidden overflow-x-scroll pb-3">
                                <div className="flex lg:md:flex-wrap gap-2 m-2">
                                    <div className="p-3 min-w-fit shadow-md rounded-lg lg:h-full flex items-center bg-[#ffee59] text-black">
                                        Total : {record.allrecord}
                                    </div>
                                    {record && record.penjab.map((item, index) => {
                                        return (
                                            <p key={index} className="p-3 shadow-md rounded-lg lg:h-full min-w-fit inline items-center bg-white text-[#00bb9b]">
                                                {item.penjab} : {item.totalKunjungan}
                                            </p>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="p-3">
                            <Pie options={options} data={data} />
                        </div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <div className="min-h-[40vh] w-full flex justify-center items-center">
                            <CircularProgress color="success" aria-label="Loading..." />
                        </div>
                    </React.Fragment>
                }
            </div>
        </React.Fragment>
    )
}

export default ChartAsuransi