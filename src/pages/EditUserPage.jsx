import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const EditUserPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [inputCheckName, setInputCheckName] = useState(false)
  const [formValues, setFormValues] = useState({
    name: '',
    userName: '',
    role: ''
  })

  const getProduct = async () => {
    const token = JSON.parse(localStorage.getItem('token'))

    const res = await fetch(`http://localhost:8080/api/users/${params.id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })

    const { getUser } = await res.json()
    setFormValues({
      name: getUser.nombre,
      userName: getUser.usuario,
      role: getUser.role
    })
  }

  const handleChange = (ev) => {
    setFormValues({ ...formValues, [ev.target.name]: ev.target.value })
    if (formValues.name) {
      setInputCheckName(false)
    }
  }

  const handleClick = async (ev) => {
    ev.preventDefault()
    const token = JSON.parse(localStorage.getItem('token'))
    
    if (formValues.name === '' && formValues.userName === '' && formValues.role === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Formulario Vacio!',
      })
    } else if (formValues.name === '') {
      setInputCheckName(true)
    } else {
      const res = await fetch(`http://localhost:8080/api/users/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre: formValues.name,
          usuario: formValues.userName,
          role: formValues.role
        })
      })
      const resUpdateUser = await res.json()
      if (resUpdateUser.status === 200) {
        Swal.fire(
          'Usuario editado correctamente!',
          'success'
        )
      }
      setFormValues({
        name: '',
        userName: '',
        role: ''
      })

      setTimeout(() => {
        navigate('/adminUsers')
      }, 1500);
    }
  }

  useEffect(() => {
    getProduct()
  }, [])


  return (
    <>
      <form>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Nombre</label>
          <input type="text" name='name' value={formValues.name} className={inputCheckName ? 'form-control is-invalid' : 'form-control'} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Precio</label>
          <input type="text" name='userName' value={formValues.userName} className={inputCheckName ? 'form-control is-invalid' : 'form-control'} id="exampleInputPassword1" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Codigo</label>
          <input type="text" name='role' value={formValues.role} className={inputCheckName ? 'form-control is-invalid' : 'form-control'} id="exampleInputPassword1" onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleClick}>Editar</button>
      </form>
    </>
  )
}

export default EditUserPage
