import React, { useEffect, useState } from 'react'

const Personas = () => {
const [data, setData] = useState([])

useEffect(() => {
  /* GET */
  fetch('https://rickandmortyapi.com/api/character')
  .then((res) => res.json())
  .then((result) => setData(result.results))
}, [])

const addData = () => {
  const newPersona = {
    id:4,
    nombre:'Maxi',
    apellido:'Busi'
  }
  setData([...data, newPersona])
}


  return (
    <>
      {
        data.map((persona) => 
        <h3 key={persona.id}>{persona.name}</h3>
        )
      }
      <button onClick={addData}>Agregar</button>
    </>
  )
}

export default Personas
