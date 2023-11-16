import React from 'react'
import { CircularProgress } from "@nextui-org/react";
const AlertAuth = ({ title, active }: { title: string, active: boolean }) => {
    return (
        <div className={`alert ${active == true && `active`}`}>
            <div className="alert-body">
                <div className="flex justify-between">
                    {title}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>
                <div className="flex items-center mt-5 gap-4">
                    <small>Menuju Dashboard</small>
                    <CircularProgress color="success" size="sm" aria-label="Loading..." />
                </div>
            </div>
        </div>
    )
}

export default AlertAuth