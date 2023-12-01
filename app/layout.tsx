import type { Metadata } from 'next'
import './globals.css'
import { Providers } from "./providers";
import { AuthProvider } from './middleware/AuthContext';

export const metadata: Metadata = {
  title: 'Dashboard HARDIN',
  description: 'WELCOME',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AuthProvider>
            {children}
          </AuthProvider>
        </Providers>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,100,0,-25" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.0.0/datepicker.min.js"></script>
      </body>
    </html>
  )
}