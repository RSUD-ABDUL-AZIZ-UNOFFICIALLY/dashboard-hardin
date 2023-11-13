'use client'
import React, { useState } from 'react'
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
const ChartDaily = () => {
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
                display: true,
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
            padding: 10,
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
                backgroundColor: 'rgb(255, 99, 132)',
                stack: 'Stack 0',
            },
            {
                label: 'Dataset 2',
                data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
                backgroundColor: 'rgb(75, 192, 192)',
                stack: 'Stack 0',
            },
            {
                label: 'Dataset 3',
                data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
                backgroundColor: 'rgb(53, 162, 235)',
                stack: 'Stack 1',
            },
        ],
    };

    return (
        <React.Fragment>
            <div className="flex justify-start items-center gap-2">
                <p>Tanggal</p>
                <div className="lg:w-52">
                    <input type="date" className='p-2 rounded-md bg-white shadow-md focus:border-[#00bb9b]' name="" id="" />
                </div>
            </div>
            <div className="">
                {/* <canvas height={200} width={200}> */}
                <div className="lg:hidden">
                    <Bar
                        options={options}
                        data={data}
                        width={100}
                        height={100}
                    />
                </div>
                {/* <canvas height={200} width={200}> */}
                <div className="lg:block hidden">
                    <Bar
                        options={options}
                        data={data}
                        width={100}
                        height={50}
                    />
                </div>
                {/* </canvas> */}
            </div>
        </React.Fragment>
    )
}

export default ChartDaily