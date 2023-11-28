'use client'
import React, { useRef, useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import moment from 'moment';
import axios from 'axios';
import { CircularProgress } from "@nextui-org/react";
ChartJS.register(ArcElement, Tooltip, Legend);

const Bangsal = ({ data, title, index }) => {

    const labelChart = [
        'APS',
        'Isoman',
        'Lain - lain',
        'Membaik',
        'Meninggal',
        'Permintaan Sendiri',
        'Persetujuan Dokter',
        'Positif',
        'Pulang Paksa',
        'Rujuk',
        'Sehat',
        'Sembuh',
        'Status Belum Lengkap',
    ]
    const dataChart = [
        data.aps,
        data.isoman,
        data.lainlain,
        data.membaik,
        data.meninggal,
        data.permintaanSendiri,
        data.persetujuanDokter,
        data.positif,
        data.pulangPaksa,
        data.rujuk,
        data.sehat,
        data.sembuh,
        data.statusBelumLengkap
    ]

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
        labels: labelChart,


        datasets: [
            {
                label: "",
                data: dataChart,
                backgroundColor: datasetColor,
                borderColor: datasetColor,
                borderWidth: 1,
            },
        ],
    };

    return (
        <React.Fragment>
            {/* <div className="p-3 h-60 w-36 bg-lime-400">{title}</div> */}
            <div className="lg:w-[28vw] md:w-[45vw] border p-4 rounded-lg shadow-sm bg-white">
                <Pie data={options} />
                <div className="flex justify-center items-center ">
                    <div className="">
                        {title}
                    </div>
                    <div className="m-2 p-3 shadow-md rounded-lg h-full flex justify-center items-center bg-[#ffee59] text-black w-20">
                        {index}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Bangsal