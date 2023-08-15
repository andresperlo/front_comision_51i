import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import clienteAxios, { config } from '../utils/axiosClient'

const CreateUserPage = () => {
  const navigate = useNavigate()
  const [inputCheckName, setInputCheckName] = useState(false)
  const [formValues, setFormValues] = useState({
    name: '',
    userName: '',
    rpass:'',
    pass:'',
    role: ''
  })

  const handleChange = (ev) => {
    setFormValues({ ...formValues, [ev.target.name]: ev.target.value })
    if (formValues.name) {
      setInputCheckName(false)
    }
  }

  const handleClick = async (ev) => {
    ev.preventDefault()
    if (formValues.name === '' && formValues.userName === '' && formValues.pass === ''  && formValues.rpass === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Formulario Vacio!',
      })
    } else if (formValues.name === '') {
      setInputCheckName(true)
    } else {
      if(formValues.pass !== formValues.rpass){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'usuario y/o contraseña incorrecta!',
        })
        return
      }
      const res = await clienteAxios.post('/users', {
        nombre: formValues.name,
        usuario: formValues.userName,
        contrasenia: formValues.pass,
        role: formValues.role
      }, config)
     

      if (res.status === 201) {
        

        Swal.fire(
          'Usuario creado correctamente!',
          '',
          'success'
        )

        setFormValues({
          name: '',
          userName: '',
          rpass:'',
          pass:'',
          role: ''
        })

       setTimeout(() => {
        navigate('/adminUsers')
       }, 1000);
      }
    }
  }

  return (
    <>
      <form>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Nombre</label>
          <input type="text" name='name' value={formValues.name} className={inputCheckName ? 'form-control is-invalid' : 'form-control'} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Usuario</label>
          <input type="text" name='userName' value={formValues.userName} className={inputCheckName ? 'form-control is-invalid' : 'form-control'} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Contrseña</label>
          <input type="number" name='pass' value={formValues.price} className={inputCheckName ? 'form-control is-invalid' : 'form-control'} id="exampleInputPassword1" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Repetir Contrseña</label>
          <input type="number" name='rpass' value={formValues.price} className={inputCheckName ? 'form-control is-invalid' : 'form-control'} id="exampleInputPassword1" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Role</label>
          <input type="text" name='role' value={formValues.code} className={inputCheckName ? 'form-control is-invalid' : 'form-control'} id="exampleInputPassword1" onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleClick}>Crear Usuario</button>
      </form>
    </>
  )
}

export default CreateUserPage
