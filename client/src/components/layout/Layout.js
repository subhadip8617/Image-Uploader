import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({userData, children}) => {
  return (
    <>
        <Header userData = {userData}/>
        <div className='content'>
            {children}
        </div>
        <Footer/>
    </>
  )
}

export default Layout