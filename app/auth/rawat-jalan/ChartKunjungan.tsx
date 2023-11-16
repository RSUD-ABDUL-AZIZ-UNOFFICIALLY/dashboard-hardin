'use client'
import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

import { format } from 'date-fns';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const ChartKunjungan = () => {
    const [selected, setSelected] = useState<Date>();

    let footer = <p>Please pick a day.</p>;
    if (selected) {
        footer = <p>You picked {format(selected, 'PP')}.</p>;
    }
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <React.Fragment>
            <div className="w-full h-full">
                <div className="p-2">
                    <div className="p-2 flex gap-2 items-center w-full">
                        <span>Dari Tanggal</span>
                        <input type="date" className='w-full p-2 rounded-md bg-white shadow-md focus:border-[#00bb9b]' />
                    </div>
                    <div className="p-2 flex gap-2 items-center">
                        <span>Hingga Tanggal</span>
                        <input type="date" className='w-full p-2 rounded-md bg-white shadow-md focus:border-[#00bb9b]' />
                    </div>
                </div>
                <div className="justify-center flex items-center h-full">
                    <div className='h-full flex justify-center p-2'>
                        <Pie data={data} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ChartKunjungan