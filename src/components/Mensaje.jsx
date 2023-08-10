import React, { useEffect } from 'react'

const Mensaje = () => {

  useEffect(() => {
    return () => {
      console.log('Componente desmontado')
    }
  }, [])

  return (
    <>
     <p>Soy un mensaje</p>
    </>
  )
}

export default Mensaje
