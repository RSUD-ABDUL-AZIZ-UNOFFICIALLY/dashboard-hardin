"use client"
import Sidebar from '../../Component/Sidebar'
import Section from './Section'
import { useEffect } from 'react'
import { useAuth } from '@/app/middleware/AuthContext'
import Footer from '@/app/Component/Footer'

export default function Home() {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <main className="main-section">
      <Sidebar active={`rawat-inap`} title={`Halaman Rawat Inap`} />
      <Section />
      <Footer />
    </main>
  )
}
