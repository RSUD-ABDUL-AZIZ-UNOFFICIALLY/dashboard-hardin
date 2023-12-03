'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation'
const Sidebar = ({ active, title }: { active: string, title: string }) => {
    const [sidebar, setSidebar] = useState<boolean>(false)
    const sidebarRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter()

    const navigation = (e: string) => {
        router.push(e, { scroll: false })
    }

    const handleSidebar = (e: boolean) => {
        setSidebar(e)
    }

    const handleLogout = () => {
        localStorage.removeItem('token_api')
        router.push(`/login`, { scroll: false })
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node | null)) {
                handleSidebar(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sidebar])

    const renderSidebar = () => {
        return (
            <React.Fragment>
                <div ref={sidebarRef} className={`sidebar ${sidebar == true && `active`}`}>
                    <div className="flex justify-end">
                        <Button onClick={() => handleSidebar(false)} className='bg-primary shadow-md text-white flex justify-center'>
                            <span className="material-symbols-outlined">
                                close
                            </span>
                        </Button>
                    </div>
                    <div className="w-full mt-[20px] mb-[20px]  grid gap-3">
                        <div className="flex justify-center">
                            <div className=" shadow-lg p-3 rounded-full">
                                <img className='lg:md:h-24 h-20 ' src="/skw.png" alt="" />
                            </div>
                        </div>
                        <div className="text-4xl font-bold text-white text-center">
                            HARDIN
                        </div>
                        <div className="text-center font-thin text-xs text-white">
                            Harmonisasi Aplikasi Rumah Sakit Berbasis Data Integrasi
                        </div>
                    </div>
                    <div className="grid gap-5">

                        <Button onClick={() => navigation(`/auth/rawat-jalan`)} className={`${active == `rawat-jalan` && `active`} sidebar-item bg-primary shadow-md text-white`}>
                            <div className="flex justify-between w-full p-4">
                                Poli Rawat Jalan
                                <span className="material-symbols-outlined">
                                    outpatient
                                </span>
                            </div>
                        </Button>
                        <Button onClick={() => navigation(`/auth/rawat-inap`)} className={`${active == `rawat-inap` && `active`} sidebar-item bg-primary shadow-md text-white`}>
                            <div className="flex justify-between w-full p-4">
                                Poli Rawat inap
                                <span className="material-symbols-outlined">
                                    hotel
                                </span>
                            </div>
                        </Button>
                        <Button onClick={() => navigation(`/auth/daftar-kamar`)} className={`${active == `daftar-kamar` && `active`} sidebar-item bg-primary shadow-md text-white`}>
                            <div className="flex justify-between w-full p-4">
                                Daftar Kamar
                                <span className="material-symbols-outlined">
                                    bed
                                </span>
                            </div>
                        </Button>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            {renderSidebar()}
            <div className="fixed top-0 left-0 flex justify-center w-[100vw]">
                <div className="navbar">
                    <div className="navbar-left">
                        <div className={`open-sidebar`}>
                            <Button onClick={() => handleSidebar(true)} className={` bg-primary-outline shadow-md text-white flex justify-center`}>
                                <span className="material-symbols-outlined">
                                    menu
                                </span>
                            </Button>
                        </div>
                    </div>
                    <div className="navbar-mid text-slate-950 text-center flex items-center">
                        {/* <img className='h-10' src="/skw.png" alt="" /> */}
                        <div className="uppercase text-[#00bb9b] font-bold lg:md:text-2xl p-1">
                            {title}
                        </div>
                        {/* <img className='h-10' src="/germas.png" alt="" /> */}
                    </div>
                    <div className="navbar-right">
                        <Dropdown className='navbar-dropdown'>
                            <DropdownTrigger>
                                <Button className='bg-primary text-white h-10 w-10' >
                                    <span className="material-symbols-outlined">
                                        person
                                    </span>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Dropdown narbar" className=''>
                                {/* <DropdownItem onClick={() => navigation(`/`)} key="new">Profil</DropdownItem> */}
                                <DropdownItem className='text-center' onClick={() => handleLogout()} key="copy">
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Sidebar  