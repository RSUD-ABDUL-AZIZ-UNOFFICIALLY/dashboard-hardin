import Image from 'next/image'
import Sidebar from '../Component/Sidebar'
import Section from './Section'

export default function Home() {
  return (
    <main className="main-section">
      <Sidebar active={`rawat-inap`} title={`Halaman Poli Rawat Inap`} />
      <Section />
      {/* <Navbar /> */}
    </main>
  )
}
