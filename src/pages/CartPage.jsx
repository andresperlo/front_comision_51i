import React, { useEffect, useState } from 'react'
import clienteAxios, { config } from '../utils/axiosClient'

const CartPage = () => {
  const [cart, setCart] = useState([])
  const [cantidadState, setCantidadState] = useState({})
  let suma = 0

  const getCartUser = async () => {

    const idUser = JSON.parse(localStorage.getItem('idUser'))
    const resCart = await clienteAxios.get(`/users/${idUser}`, config)
    const resProd = await clienteAxios.get(`/cart/${resCart.data.getUser.idCart}`, config)
    const valoresIniciales = {}

    resProd.data.getCart.products.forEach(producto => {
      valoresIniciales[producto._id] = 0
      setCantidadState(valoresIniciales)
    });

    setCart(resProd.data.getCart.products)
  }

  const handleChange = (ev, idProd) => {
    const { value } = ev.target
    setCantidadState({ ...cantidadState, [idProd]: parseInt(value) })
  }

  const getResult = (precio, cantidad) => {
    const res = precio * cantidad
    if (isNaN(res)) {
      return 0
    } else {
      suma += res
      return res

    }


  }

  const handleClickMP = async () => {
    const res = await clienteAxios.post('/pay', {}, config)
    location.href=`${res.data.res.init_point}`
  }

  useEffect(() => {
    getCartUser()
  }, [])

  useEffect(() => {
    getResult()
  }, [cantidadState])

  return (
    <>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID Producto</th>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {
            cart.map((producto) =>
              <tr key={producto._id}>
                <th scope="row">{producto._id}</th>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
                <td>
                  <input type="number" name="" id="" className='w-25' onChange={(ev) => handleChange(ev, producto._id)} />
                </td>
                <td>
                  {
                    getResult(producto.precio, cantidadState[producto._id])
                  }
                </td>
              </tr>)
          }
        </tbody>
      </table>
      <div className='d-flex justify-content-between px-5'>
        <button className='btn btn-primary' onClick={handleClickMP}>Pagar</button>
        <h2>{suma}</h2>
      </div>

    </>
  )
}

export default CartPage
