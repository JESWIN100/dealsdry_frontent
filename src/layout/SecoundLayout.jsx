import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

export default function SecoundLayout() {
  return (
    <div>
      <Header />
      <main className='min-h-96'>
        <Outlet />
      </main>
    </div>
  )
}
