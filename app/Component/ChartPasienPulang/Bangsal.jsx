'use client'
import React, { useRef, useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import moment from 'moment';
import axios from 'axios';
import { CircularProgress } from "@nextui-org/react";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const Bangsal = ({ data, title, index }) => {
    ChartJS.register(
        ArcElement,
        Tooltip,
        Legend,
        ChartDataLabels

    );

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

    const options = {
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
        layout: {
            padding: 20,
        },
        animation: {

        }
    };

    const datasetColor = [
        '#ffd5904A',
        '#90ffd54A',
        // '#ebf2fa4A',
        '#ff67004A',
        '#baff904A',
        '#4361ee4A',
        '#a5be004A',
        '#bad5904A',
        '#ffb7034A',
        '#d590ff4A',
        '#ba90d54A',
        '#ff90d54A',
        '#90baff4A',
        '#90ffd54A',
    ]
    const datasetColorBorder = [
        '#ffd590',
        '#90ffd5',
        // '#ebf2fa',
        '#ff6700',
        '#baff90',
        '#4361ee',
        '#a5be00',
        '#bad590',
        '#ffb703',
        '#d590ff',
        '#ba90d5',
        '#ff90d5',
        '#90baff',
        '#90ffd5',
    ]

    const datas = {
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
            <div className="lg:w-[28vw]  md:w-[45vw] p-2 rounded-lg shadow-md bg-white">
                <Pie options={options} data={datas} />
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