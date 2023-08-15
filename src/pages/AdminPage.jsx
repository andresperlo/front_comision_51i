import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import clienteAxios, { config } from '../utils/axiosClient'

const AdminPage = () => {
  const [products, setProducts] = useState([])
  const [refreshProd, setRefreshProd] = useState(false);

  const getAllProducts = async () => {
    const res = await clienteAxios.get('/products')
    setProducts(res.data.getAllProd)
  }

  const deleteProduct = async (id) => {
    const token = JSON.parse(localStorage.getItem('token'))

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        clienteAxios.delete(`products/${id}`, config)
          .then(res => {
            if (res.status === 200) {
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
        setRefreshProd(true)
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

  useEffect(() => {
    getAllProducts()
    setRefreshProd(false)
  }, [refreshProd])


  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Codigo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((producto) =>
              <tr>
                <th scope="row">{producto._id}</th>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
                <td>{producto.codigo}</td>
                <td>
                  <Link to={`/edit/${producto._id}`} className='btn btn-success'>Editar</Link>
                  <button className='btn btn-danger' onClick={() => deleteProduct(producto._id)}>Eliminar</button>
                </td>
              </tr>
            )
          }

        </tbody>
      </table>
    </>
  )
}

export default AdminPage
