'use client'

import React, { useEffect, useState, useContext } from 'react'
import { Button } from '@nextui-org/button';
import { Avatar, Image, Input, Spinner } from "@nextui-org/react";
import { useRouter } from 'next/navigation'
import axios from 'axios';
import moment, { now } from 'moment';
import AlertAuth from './AlertAuth';

const Section = () => {
    const base_url = process.env.base_url
    const router = useRouter()
    const [otpLoading, setOtpLoading] = useState<boolean>(false)
    const waktu_loading_otp = 120
    const [seconds, setSeconds] = useState(waktu_loading_otp);
    const [timeFormat, setTimeFormat] = useState(moment.duration(waktu_loading_otp, 'seconds'))

    const [noWa, setNoWa] = useState<string>(``)
    const [kodeOtp, setKodeOtp] = useState<string>(``)
    const [authCheck, setAuthCheck] = useState<boolean>(false)

    const getOtp = async () => {
        try {
            await axios.post(`${base_url}/rest/getOtp`, {
                phone: noWa
            });
        } catch (error) {
        }
        if (otpLoading == false) {
            setOtpLoading(true)
        } else {
            return
        }
    }



    const handleLogin = async () => {
        try {
            const data = await axios.post(`${base_url}/rest/login`, {
                phone: noWa,
                otp: kodeOtp,
                app_name: 'dashboard'
            });
            if (data.data.error == false && data.data.permission[0] == `dashboard`) {
                localStorage.setItem("token_api", data.data.token_api);
                setAuthCheck(true)
                setTimeout(() => {
                    setAuthCheck(false)
                    router.push('/auth/rawat-jalan', { scroll: false })
                }, 1500)
            }

        } catch (error) {

        }
    }


    const checkAuthToken = async () => {
        const token_api = localStorage.getItem('token_api')
        if (token_api) {
            try {
                const response = await axios.get(`${base_url}/api/dashboard/regpoli/daily?tgl_registrasi=2023-11-10`, {
                    headers: {
                        'Authorization': 'Bearer ' + token_api
                    }
                })
                if (response.data.status == true) {
                    setAuthCheck(true)
                    setTimeout(() => {
                        setAuthCheck(false)
                        router.push('/auth/rawat-jalan', { scroll: false })
                    }, 1500)
                } else {
                    setAuthCheck(false)
                }
            } catch (error) {

            }
        } else {
            setAuthCheck(false)
        }
    }

    useEffect(() => {
        checkAuthToken()
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

    return (
        <React.Fragment>
            <AlertAuth title={`Anda Sudah Login`} active={authCheck} />
            <div className="card shadow-[#bad3d7] w-[80%] md:w-[65%] lg:w-[50%] p-4 shadow-lg rounded-xl">
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
                        <Button isDisabled={otpLoading == true || !noWa ? true : false} onClick={() => getOtp()} className='w-full bg-[#4980f6] shadow-md text-white flex justify-between'>
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
                        <Button isDisabled={kodeOtp ? false : true} onClick={() => handleLogin()} className='w-full bg-[#00bb9b] shadow-md text-white flex justify-between'>
                            Login
                            <span className="material-symbols-outlined">
                                login
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Section