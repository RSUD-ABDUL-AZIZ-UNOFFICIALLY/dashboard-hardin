'use client'
import React from 'react'

const DateRangeInput = ({ dateStart, setDateStart, dateEnd, setDateEnd, onSubmit }) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        if (onSubmit) onSubmit()
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 items-end">
            <div>
                <label className='text-sm text-black mr-2' htmlFor="dateStart">Dari Tanggal</label>
                <input
                    className='lg:p-2 p-1 shadow-md rounded-lg w-full lg:w-48 bg-white text-[#00bb9b] border border-gray-300 focus:outline-none focus:border-[#00bb9b]'
                    value={dateStart}
                    onChange={(e) => setDateStart(e.target.value)}
                    type="date"
                />
            </div>
            <div>
                <label className='text-sm text-black mr-2' htmlFor="dateEnd">Hingga Tanggal</label>
                <input
                    className='lg:p-2 p-1 shadow-md rounded-lg w-full lg:w-48 bg-white text-[#00bb9b] border border-gray-300 focus:outline-none focus:border-[#00bb9b]'
                    value={dateEnd}
                    onChange={(e) => setDateEnd(e.target.value)}
                    type="date"
                />
            </div>
            <button
                type="submit"
                className="lg:p-2 p-1 shadow-md rounded-lg bg-[#00bb9b] text-white hover:bg-[#00a085] transition-colors"
            >
                Cari
            </button>
        </form>
    )
}

export default DateRangeInput
