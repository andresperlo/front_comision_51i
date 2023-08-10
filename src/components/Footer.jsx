import React, { useEffect, useState } from 'react'

const Footer = () => {
  const [role, setRole] = useState('')

  const getRole = () => {
    const role = JSON.parse(localStorage.getItem('role')) || ''
    setRole(role)
  }

  useEffect(() => {
    console.log(role)
    getRole()
  },[role])

  return (
    <>
      {
        role !== 'admin'
        &&
        <footer className='py-5 bg-dark text-white text-center'>
          <h2>Footer</h2>
        </footer>
      }
    </>
  )
}

export default Footer
