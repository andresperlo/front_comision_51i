import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import clienteAxios, { config } from '../utils/axiosClient'

const CreateProdPage = () => {
  const navigate = useNavigate()
  const [inputCheckName, setInputCheckName] = useState(false)
  const [formValues, setFormValues] = useState({
    name: '',
    price: 0,
    code: ''
  })

  const handleChange = (ev) => {
    setFormValues({ ...formValues, [ev.target.name]: ev.target.value })
    if (formValues.name) {
      setInputCheckName(false)
    }
  }

  const handleClick = async (ev) => {
    ev.preventDefault()
    const token = JSON.parse(localStorage.getItem('token'))
    if (formValues.name === '' && formValues.price === '' && formValues.code === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Formulario Vacio!',
      })
    } else if (formValues.name === '') {
      setInputCheckName(true)
    } else {
      const res = await clienteAxios.post('products', {
        nombre: formValues.name,
        precio: formValues.price,
        codigo: formValues.code
      }, config)
     

      if (res.status === 201) {
        
        Swal.fire(
          'Producto creado correctamente!',
          '',
          'success'
        )

        setFormValues({
          name: '',
          price: 0,
          code: ''
        })

       setTimeout(() => {
        navigate('/admin')
       }, 1000);
      }
    }
  }

  return (
    <>
    <div className='d-flex justify-content-center'>
    <form className='w-25'>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Nombre</label>
          <input type="text" name='name' value={formValues.name} className={inputCheckName ? 'form-control is-invalid' : 'form-control'} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Precio</label>
          <input type="number" name='price' value={formValues.price} className={inputCheckName ? 'form-control is-invalid' : 'form-control'} id="exampleInputPassword1" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Codigo</label>
          <input type="text" name='code' value={formValues.code} className={inputCheckName ? 'form-control is-invalid' : 'form-control'} id="exampleInputPassword1" onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleClick}>Crear Producto</button>
      </form>
    </div>
     
    </>
  )
}

export default CreateProdPage
