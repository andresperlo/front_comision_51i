import React, { useState } from 'react'


const UserMap = (props) => {
  const { array } = props
   const [usuario, setUsuario] = useState()
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <ul>
              {
                array.map((persona) =>
                  <li key={persona.id}>{persona.nombre}</li>
                )
              }
            </ul>
          </div>
        </div>
      </div>

    </>
  )
}

export default UserMap
