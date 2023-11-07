import Image from 'next/image'
import Sidebar from '../Component/Sidebar'
import Section from './Section'

export default function Home() {
  return (
    <main className="main-section">
      <Sidebar active={`rawat-jalan`} title={`Halaman Poli Rawat Jalan`} />
      <Section />
      {/* <Navbar /> */}
    </main>
  )
}
