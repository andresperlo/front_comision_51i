import React, { useState } from 'react'

const Contador = (props) => {
  const { valor } = props
  const [valorIn, setValorIn] = useState(valor)

  const sumarValor = () => {
    setValorIn(valorIn + 1)
  }

  const restarValor = () => {
    setValorIn(valorIn - 1)
  }

  const resetearValor = () => {
    setValorIn(valor)
  }

  return (
    <>
      <h2>Contador</h2>
      <hr />

      <h2>Contador: {valorIn}</h2>
      <button className='btn btn-outline-primary w-25' onClick={sumarValor}>+1</button>
      <button className='btn btn-outline-primary w-25' onClick={restarValor}>-1</button>
      <button className='btn btn-outline-primary w-25' onClick={resetearValor}>Reiniciar</button>
    </>
  )
}

export default Contador
