import React from 'react'
import { CircularProgress } from "@nextui-org/react";
const AlertError = ({ title, active }: { title: string, active: boolean }) => {
    return (
        <div className={`alert ${active == true && `active`}`}>
            <div className="alert-body">
                <div className="flex justify-between text-red-500">
                    {title}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default AlertError