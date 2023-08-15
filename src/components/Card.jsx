import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import clienteAxios, { config } from '../utils/axiosClient'


const Card = ({ array }) => {

  const handleClick = async (id) => {
    try {
      const idUser = JSON.parse(localStorage.getItem('idUser'))

      const resCart = await clienteAxios.get(`/users/${idUser}`, config)
      const resProd = await clienteAxios.post(`/cart/${resCart.data.getUser.idCart}/${id}`, {}, config)
      if (resProd.status === 200) {
        Swal.fire(
          'Genial!',
          resProd.data.msg,
          'success'
        )
      }
    } catch (error) {
      if (error.response.status === 500) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.msg,
        })
      }else if(error.response.status === 400){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.msg,
        })
      }
    }
  }

  return (
    <>
      {
        array.map((articulo) =>
          <div key={articulo._id} className="card mx-3" style={{ width: '18rem', marginTop: '25px' }}>
            <img src={articulo.img} className="card-img-top" alt={articulo.alt} />
            <div className="card-body">
              <h5 className="card-title">{articulo.nombre}</h5>
              <p className="card-text">{articulo.precio}</p>
              <Link to={`/product/${articulo._id}`} className="btn btn-primary">Ver Mas...</Link>
              <button className='btn btn-outline-success' onClick={() => handleClick(articulo._id)}>Agregar Carrito</button>
            </div>
          </div>

        )
      }
    </>
  )
}

export default Card
