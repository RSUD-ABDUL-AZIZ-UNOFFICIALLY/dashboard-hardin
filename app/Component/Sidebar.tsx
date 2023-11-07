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

    useEffect(() => {
        console.log(sidebarRef.current);
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

    return (
        <React.Fragment>
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
                <div className="navbar-mid text-slate-950 text-center">
                    {title}
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
                            <DropdownItem onClick={() => navigation(`/`)} key="new">Profil</DropdownItem>
                            <DropdownItem onClick={() => navigation(`/login`)} key="copy">Logout</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <div ref={sidebarRef} className={`sidebar ${sidebar == true && `active`}`}>
                <div className="flex justify-end">
                    <Button onClick={() => handleSidebar(false)} className='bg-primary shadow-md text-white flex justify-center'>
                        <span className="material-symbols-outlined">
                            close
                        </span>
                    </Button>
                </div>
                <div className="w-full mt-[20px] mb-[20px] text-4xl font-bold text-white text-center">
                    HARDIN
                </div>
                <div className="grid gap-5">
                    <Button onClick={() => navigation(`/`)} className={`${active == `dashboard` && `active`} sidebar-item bg-primary shadow-md text-white`}>
                        <div className="flex justify-between w-full p-4">
                            Dashboard
                            <span className="material-symbols-outlined">
                                dashboard
                            </span>
                        </div>
                    </Button>
                    <Button onClick={() => navigation(`/rawat-jalan`)} className={`${active == `rawat-jalan` && `active`} sidebar-item bg-primary shadow-md text-white`}>
                        <div className="flex justify-between w-full p-4">
                            Poli Rawat Jalan
                            <span className="material-symbols-outlined">
                                outpatient
                            </span>
                        </div>
                    </Button>
                    <Button onClick={() => navigation(`/rawat-inap`)} className={`${active == `rawat-inap` && `active`} sidebar-item bg-primary shadow-md text-white`}>
                        <div className="flex justify-between w-full p-4">
                            Poli Rawat inap
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

export default Sidebar  