import React from 'react'
import Navbar from '../components/layouts/Navbar'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col w-screen min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
    </div>
  )
}