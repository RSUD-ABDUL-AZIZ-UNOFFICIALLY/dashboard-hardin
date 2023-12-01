import React from 'react'
import Section from './Section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Halaman Login',
    description: 'Halaman',
}
export default function Page() {

    return (
        <main className="grid lg:grid-cols-2 min-h-[100vh]">
            <div className="flex justify-center bg-[#fffeff] items-center w-full min-h-full">
                <Section />
            </div>
            <div className="lg:block hidden h-full w-full bg-[#00bb9b]">
                {/* <img src="/img/skw.png" alt="" /> */}
            </div>
        </main>
    )
}
