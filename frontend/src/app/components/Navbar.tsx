// Main imports
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// Assets
import logo from '@/app/public/img/partytimelogo.png'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center mb-5 p-5 border-b-2'>
      <Image src={logo} alt='logo' width={35} height={35} />
      <h1>Party Time</h1>
      <nav className='flex gap-2'>
        <Link href="/">Home</Link>
        <Link href="/login">Entrar</Link>
        <Link href="/register">Cadastrar</Link>
      </nav>
    </div>
  )
}

export default Navbar