import Image from 'next/image'
import Sidebar from './Component/Sidebar'
import Section from './Section'

export default function Home() {
  return (
    <main className="main-section">
      <Sidebar active={`dashboard`} title={`Halaman Dashboard`} />
      <Section />
      {/* <Navbar /> */}
    </main>
  )
}
