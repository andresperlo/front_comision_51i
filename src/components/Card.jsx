import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'


const Card = ({ array }) => {

  const handleClick = async (id) => {
    const idUser = JSON.parse(localStorage.getItem('idUser'))
    const token = JSON.parse(localStorage.getItem('token'))
    console.log(token)
    const resCart = await fetch(`http://localhost:8080/api/users/${idUser}`, {
      method:'GET',
      headers: {
        "content-type": "application/json",
        'authorization': `Bearer ${token}`
      }
    })
    const dataCart = await resCart.json()

    const idCart = dataCart.getUser.idCart
    const resProd = await fetch(`http://localhost:8080/api/cart/${idCart}/${id}`, {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        'authorization': `Bearer ${token}`
      }
    })
    const dataProd = await resProd.json()

    if (dataProd.status === 400) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: dataProd.msg,
      })
    } else {
      Swal.fire(
        'Good job!',
        dataProd.msg,
        'success'
      )
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
