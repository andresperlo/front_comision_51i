import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  const [formInputs, setFormInputs] = useState({
    user: '',
    pass: ''
  })

  const [userInput, setUserInput] = useState(false)
  const [passInput, setPassInput] = useState(false)

  const handleChange = (ev) => {
    setFormInputs({ ...formInputs, [ev.target.name]: ev.target.value })

    if (formInputs.user) {
      setUserInput(false)
    } else if (formInputs.pass) {
      setPassInput(false)
    }
  }

  const handleClick = async (ev) => {
    ev.preventDefault()
    if (formInputs.user) {
      if (formInputs.pass) {
        setUserInput(false)
        setPassInput(false)

        const res = await fetch('http://localhost:8080/api/users/login', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario: formInputs.user,
            contrasenia: formInputs.pass
          })
        })

        const data = await res.json()
        console.log(data.userUpdate.role)
        if (data.userUpdate.role === 'admin') {
          localStorage.setItem('token', JSON.stringify(data.userUpdate.token))
          localStorage.setItem('role', JSON.stringify(data.userUpdate.role))
          localStorage.setItem('idUser', JSON.stringify(data.userUpdate._id))
          navigate('/admin')
        } else if (data.userUpdate.role === 'user') {
          localStorage.setItem('token', JSON.stringify(data.userUpdate.token))
          localStorage.setItem('role', JSON.stringify(data.userUpdate.role))
          localStorage.setItem('idUser', JSON.stringify(data.userUpdate._id))
          navigate('/user')
        }

      }
    } else {
      setUserInput(true)
      setPassInput(true)
    }
  }

  useEffect(() => {
    console.log(formInputs)
  }, [formInputs])


  return (
    <>
      <h2 className='py-3 text-center'>Iniciar sesion</h2>
      <div className='d-flex justify-content-center'>
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Usuario</label>
            <input type="text" name='user' class={userInput ? 'form-control is-invalid' : 'form-control'} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange} />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Contraseña</label>
            <input type="password" name='pass' class={passInput ? 'form-control is-invalid' : 'form-control'} id="exampleInputPassword1" onChange={handleChange} />
          </div>
          <button type="submit" class="btn btn-primary my-3" onClick={handleClick}>Iniciar Sesion</button>
        </form>
      </div>
    </>
  );
}

export default LoginPage
