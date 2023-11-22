import React from 'react'
import { CircularProgress } from "@nextui-org/react";
const AlertSuccess = ({ title, active }: { title: string, active: boolean }) => {
    return (
        <div className={`alert ${active == true && `active`}`}>
            <div className="alert-body">
                <div className="flex justify-between text-green-500">
                    {title}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default AlertSuccess