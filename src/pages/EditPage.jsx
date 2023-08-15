import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import clienteAxios, { config } from '../utils/axiosClient'

const EditPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  
  const [inputCheckName, setInputCheckName] = useState(false)
  const [recargarPage, setRecargarPage] = useState(false)
  const [formValues, setFormValues] = useState({
    name: '',
    price: 0,
    code: ''
  })

  const getProduct = async () => {
    const res = await clienteAxios.get(`/products/${params.id}`)
    setFormValues({
      name: res.data.getOneProd.nombre,
      price: res.data.getOneProd.precio,
      code: res.data.getOneProd.codigo
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

    if (formValues.name === '' && formValues.price === '' && formValues.code === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Formulario Vacio!',
      })
    } else if (formValues.name === '') {
      setInputCheckName(true)
    } else {

      const res = await clienteAxios.put(`/products/${params.id}`, {
        nombre: formValues.name,
        precio: formValues.price,
        codigo: formValues.code
      }, config)

      if(res.status === 200){
        navigate('/admin')
      }
      setRecargarPage(true)
    }
  }

  useEffect(() => {
    getProduct()
    setRecargarPage(false)
  }, [recargarPage])


  return (
    <>
      <form>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Nombre</label>
          <input type="text" name='name' value={formValues.name} className={inputCheckName ? 'form-control is-invalid' : 'form-control'} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Precio</label>
          <input type="number" name='price' value={formValues.price} className={inputCheckName ? 'form-control is-invalid' : 'form-control'} id="exampleInputPassword1" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Codigo</label>
          <input type="text" name='code' value={formValues.code} className={inputCheckName ? 'form-control is-invalid' : 'form-control'} id="exampleInputPassword1" onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleClick}>Editar</button>
      </form>
    </>
  )
}

export default EditPage
