import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header/Header'

const Layout = ({children}) => {
  return (
    <main className='App'>
      <Header />
      {/* {children} */}
      <Outlet />
    </main>
  )
}

export default Layout