import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Form = () => {
  const [formInputs, setFormInputs] = useState({
    name:'',
    user: '',
    pass: '',
    repeatPass: ''
  })

  const navigate = useNavigate()

  const handleChange = (ev) => {
    const { name, value } = ev.target
    setFormInputs({...formInputs, [name]: value })
  }

  useEffect(() => {
    console.log(formInputs)
  }, [formInputs])

  const handleSubmit = async() => {
    if(formInputs.pass === formInputs.repeatPass){
      const res = await fetch('http://localhost:8080/api/users', {
        method:'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formInputs.name,
          usuario: formInputs.user,
          contrasenia: formInputs.pass
        })
      })
      
      const data = await res.json()
      if(data.status === 201){
        Swal.fire(
          'Registro exitoso!',
          'Inicia sesion para ver tu home!',
          'success'
        )

        setTimeout(() => {
          navigate('/login')
        }, 2000);
      }
    }
  }


  return (
    <>
      <div className='d-flex justify-content-center'>
        <form className='w-50'>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail3" className="form-label">Nombre y Apellido</label>
            <input type="text" name='name' className="form-control" id="exampleInputEmail3" aria-describedby="emailHelp" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Usuario</label>
            <input type="text" name='user' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
            <input type="password" name='pass' onChange={handleChange} className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">Repetir Contraseña</label>
            <input type="password" name='repeatPass' onChange={handleChange} className="form-control" id="exampleInputPassword2" />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>Enviar</button>
        </form>
      </div>

    </>
  )
}

export default Form
