'use client'
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import moment from 'moment';
import axios from 'axios';
import { CircularProgress } from "@nextui-org/react";
ChartJS.register(ArcElement, Tooltip, Legend);

const ChartAsuransi = () => {
    const base_url = process.env.base_url
    const today = moment()
    const [dateStart, setDateStart] = useState(today.format('YYYY-MM-DD'))
    const [dateEnd, setDateEnd] = useState(today.format('YYYY-MM-DD'))
    const [record, setRecord] = useState(null)
    const [iniLabel, setLabel] = useState([])

    const getData = async () => {
        const token_api = localStorage.getItem('token_api')
        try {
            const response = await axios.get(`${base_url}/api/dashboard/reg/asuransi/ralan?from=${dateStart}&until=${dateEnd}`, {
                headers: {
                    'Authorization': 'Bearer ' + token_api
                }
            })

            console.log('data', response.data.data);
            if (response.data.data) {
                setRecord(response.data.data)

                const labels = response.data.data.penjab.map((item) => item.penjab);
                setLabel(labels);
            }

        } catch (error) {

        }
    }

    console.log(record);
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
                    <div className="text-center uppercase w-full bg-[#00bb9b] p-3 text-white shadow-lg">Pelayanan Rawat Jalanan</div>
                </div>
                {record ?
                    <React.Fragment>
                        <div className="p-2 lg:flex justify-start">
                            <div className="p-2 flex gap-2 items-center w-full">
                                <label className='text-sm' htmlFor="">Dari Tanggal</label>
                                <input className='lg:p-3 p-2 shadow-md rounded-lg w-full' value={dateStart} onChange={(e) => setDateStart(e.target.value)} type="date" />
                            </div>
                            <div className="p-2 flex gap-2 items-center w-full">
                                <label className='text-sm' htmlFor="">Hingga Tanggal</label>
                                <input className='lg:p-3 p-2 shadow-md rounded-lg w-full' value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} type="date" />
                            </div>
                        </div>
                        <div className="p-3">
                            <Pie data={data} />
                        </div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <div className="min-h-[30vh] w-full flex justify-center items-center">
                            <CircularProgress color="success" aria-label="Loading..." />
                        </div>
                    </React.Fragment>
                }
            </div>
        </React.Fragment>
    )
}

export default ChartAsuransi