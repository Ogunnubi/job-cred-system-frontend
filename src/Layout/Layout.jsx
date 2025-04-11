import React from 'react'
// import Footer from '../components/Footer/Footer'
import Header from '../Components/Header/Header'

const Layout = ({children}) => {
  return (
    <main className='App'>
        <Header />
        {children}
    </main>
  )
}

export default Layout