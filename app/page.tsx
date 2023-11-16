'use client'
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation'
import axios from "axios";
import { Spinner } from "@nextui-org/react";

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/login')
  })
  return (
    <main className="main-section flex justify-center items-center h-[100vh] text-5xl font-bold uppercase">
      <Spinner size="lg" color="success" />
    </main>
  )
}
