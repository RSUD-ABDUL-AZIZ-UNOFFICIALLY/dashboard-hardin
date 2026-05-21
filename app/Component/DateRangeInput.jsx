'use client'
import React from 'react'

const DateRangeInput = ({ dateStart, setDateStart, dateEnd, setDateEnd, onSubmit }) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        if (onSubmit) onSubmit()
    }

    return (
      <form onSubmit={handleSubmit} className="flex gap-2 items-end">
        <div className="lg:md:flex justify-start p-2 gap-2">
          <div className="gap-2 items-center w-full lg:md:mb-0 mb-2">
            <label className="text-sm text-black" htmlFor="dateStart">
              Dari Tanggal
            </label>
            <input
              className="p-2 shadow-md rounded-lg w-full bg-white text-[#00bb9b]"
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
              type="date"
            />
          </div>
          <div className="gap-2 items-center w-full lg:md:mb-0 mb-2">
            <label className="text-sm text-black" htmlFor="dateEnd">
              Hingga Tanggal
            </label>
            <input
              className="p-2 shadow-md rounded-lg w-full bg-white text-[#00bb9b]"
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
              type="date"
            />
          </div>
        </div>
      </form>
    );
}

export default DateRangeInput
