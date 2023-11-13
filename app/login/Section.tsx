'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/button';
import { Avatar, Image, Input, Spinner } from "@nextui-org/react";
import { useRouter } from 'next/navigation'
import axios from 'axios';
import moment from 'moment';

const Section = () => {
    const jwt = require('jsonwebtoken');
    const jwt_token = process.env.JWT_SECRET; // Gunakan secret yang aman dari variabel lingkungan
    const base_url = process.env.base_url

    const router = useRouter()
    const [otpLoading, setOtpLoading] = useState<boolean>(false)
    const waktu_loading_otp = 120
    const [seconds, setSeconds] = useState(waktu_loading_otp);
    const [timeFormat, setTimeFormat] = useState(moment.duration(waktu_loading_otp, 'seconds'))

    const [noWa, setNoWa] = useState<string>()
    const [kodeOtp, setKodeOtp] = useState<string>()

    useEffect(() => {
        if (otpLoading) {
            const countdown = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                    setTimeFormat(moment.duration(seconds - 1, 'seconds'))
                } else {
                    setOtpLoading(false)
                    setSeconds(waktu_loading_otp)
                }
            }, 1000);

            return () => clearInterval(countdown);
        }
    }, [otpLoading, seconds])

    const getOtp = async () => {
        try {
            const response = await axios.post(`${base_url}/getOtp`, {
                phone: noWa
            });
            console.log('response', response);

        } catch (error) {
            console.log(error);

        }
        // if (otpLoading == false) {
        //     setOtpLoading(true)
        // } else {
        //     return
        // }
    }

    const navigasi = () => {
        router.push('/', { scroll: false })
    }

    return (
        <div className="card shadow-[#bad3d7] p-4 shadow-lg rounded-xl">
            <div className="card-body w-full grid gap-3 p-5">
                <div className="logo grid justify-center">
                    <div className="w-full flex justify-center">
                        <Image
                            width={70}
                            alt="NextUI hero Image with delay"
                            src="/img/skw.png"
                        />
                    </div>
                    <div className="w-full text-center ">
                        <h1 className='font-bold'>RSUD dr. Abdul Aziz</h1>
                        <span>Kota Singkawang</span>
                    </div>
                </div>
                <Input value={noWa} onChange={(e) => setNoWa(e.target.value)} type="text" label="Nomor Whatsapp" />
                <Input value={kodeOtp} onChange={(e) => setKodeOtp(e.target.value)} type="text" label="Kode OTP" />
                <hr />
                <div className="grid gap-4 ">
                    <Button isDisabled={otpLoading == true || noWa == null ? true : false} onClick={() => getOtp()} className='w-full bg-[#4980f6] shadow-md text-white flex justify-between'>
                        Dapatkan OTP
                        {otpLoading == true ?
                            <React.Fragment>
                                <div className="flex items-center">
                                    {/* <Spinner className='circle2' size="sm" color="warning" /> */}
                                    <p>{`${timeFormat.minutes()}:${timeFormat.seconds() < 10 ? `0${timeFormat.seconds()}` : `${timeFormat.seconds()}`}`}</p>
                                </div>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <span className="material-symbols-outlined">
                                    code
                                </span>
                            </React.Fragment>
                        }
                    </Button>
                    <Button className='w-full bg-[#00bb9b] shadow-md text-white flex justify-between'>
                        Login
                        <span className="material-symbols-outlined">
                            login
                        </span>
                    </Button>
                </div>
                <div className="flex justify-center items-center mt-4">
                    <span className='text-[#00bb9b]'>Kembali ke Dashboard </span>
                    <Button onClick={() => navigasi()} className='bg-[#00bb9b] shadow-md m-1 text-white'>
                        <span className="material-symbols-outlined">
                            home
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Section