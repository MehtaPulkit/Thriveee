import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'

const AuthLayout = () => {
  return (
    <div className=''>
      <Outlet />
    </div>
  )
}

export default AuthLayout
