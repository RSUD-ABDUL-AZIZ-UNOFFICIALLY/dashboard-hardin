import { button } from '@nextui-org/react'
import React from 'react'
import { Button } from "@nextui-org/react";
const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const buttonScroll = () => {
        return (
            <div className="fixed z-20 bottom-[50px] right-[5px]">
                <button onClick={scrollToTop} className="p-3 duration-75 active:scale-95 hover:active:bg-slate-50 rounded-full m-3 shadow-lg bg-white text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                    </svg>
                </button>
            </div>
        )
    }

    return (
        <div className='footer'>
            {buttonScroll()}
            <div className="uppercase font-bold text-sm">Dashboard Hardin</div>
            <div className="text-sm">Copyright &copy; RSUD dr. Abdul Aziz</div>
            <div className="text-xs">2023</div>
        </div>
    )
}

export default Footer