'use client'
import React, { useEffect, useState, useCallback } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { Input } from "@nextui-org/react";
import moment from 'moment';
import axios from 'axios';

const ChartDaily = () => {
    const base_url = process.env.base_url
    const today = moment()
    const [dateStart, setDateStart] = useState<any | null>(today.format('YYYY-MM-DD'))
    const [dateEnd, setDateEnd] = useState<any | null>(today.format('YYYY-MM-DD'))
    const [record, setRecord] = useState<any | null>(null)
    const [iniLabel, setLabel] = useState<any | null>([])
    const getData = async () => {
        const token_api = localStorage.getItem('token_api')

        try {
            const response = await axios.get(`${base_url}/api/dashboard/reg/reports/ranap?from=${dateStart}&until=${dateEnd}`, {
                headers: {
                    'Authorization': 'Bearer ' + token_api
                }
            })
            if (response.data.data) {
                console.log(response.data.data.poliklinik);
                setRecord(response.data.data.poliklinik)
            }

        } catch (error) {

        }
    }

    const rangeDate: any[] = []

    const handleDateChange = () => {
        const startDate = moment(dateStart)
        const endDate = moment(dateEnd)

        const totalDays = endDate.diff(startDate, 'days')

        for (let i = 0; i <= totalDays; i++) {
            const currentDate = moment(startDate).add(i, 'days')
            rangeDate.push(currentDate.format('DD MMMM YYYY'))
        }
        if (rangeDate) {
            setLabel(rangeDate.map((items: any) => items))
        }
    }

    useEffect(() => {
        getData()
        handleDateChange()
    }, [dateStart, dateEnd])


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
            // mode: 'index' as const,
            // intersect: false,
        },
        // scales: {
        //     x: {
        //         stacked: true,
        //     },
        //     y: {
        //         stacked: true,
        //     },
        // },
        layout: {
            padding: 5,
        },
    };

    const labels = iniLabel;

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                backgroundColor: 'rgb(255, 99, 132)',
                stack: 'Stack 0',
            },
            {
                label: 'Dataset 2',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                backgroundColor: 'rgb(75, 192, 192)',
                stack: 'Stack 0',
            },
            {
                label: 'Dataset 3',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                backgroundColor: 'rgb(53, 162, 235)',
                stack: 'Stack 1',
            },
            {
                label: 'Dataset 4',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                backgroundColor: 'rgb(153, 62, 235)',
                stack: 'Stack 1',
            },
        ],
    };

    return (
        <React.Fragment>
            <div className="lg:w-[50vw] grid grid-cols-2 gap-4">
                <div className="flex justify-start items-center gap-2">
                    <p>Tanggal Mulai</p>
                    <Input value={dateStart} onChange={(e) => setDateStart(e.target.value)} type="date" />
                </div>
                <div className="flex justify-start items-center gap-2">
                    <p>Tanggal Selesai </p>
                    <Input value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} type="date" />
                </div>
            </div>
            <div className="mt-4">
                {/* <canvas height={200} width={200}> */}
                <div className="lg:hidden">
                    <Bar
                        options={options}
                        data={data}
                        // width={auto}
                        height={100}
                    />
                </div>
                {/* <canvas height={200} width={200}> */}
                <div className="lg:block hidden">
                    <Bar
                        options={options}
                        data={data}
                        width={100}
                        height={30}
                    />
                </div>
                {/* </canvas> */}
            </div>
        </React.Fragment>
    )
}

export default ChartDaily