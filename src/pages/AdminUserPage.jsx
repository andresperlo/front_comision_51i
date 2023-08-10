import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const AdminUserPage = () => {
  const [users, setUsers] = useState([])
  const [refreshUsers, setRefreshUsers] = useState(false);

  const getAllUsers = async () => {
    const token = JSON.parse(localStorage.getItem('token'))

    const res = await fetch('http://localhost:8080/api/users', {
      method:'GET',
      headers:{
        'content-type':'application/json',
        'authorization': `Bearer ${token}` 
      }
    })
    const { allUsers } = await res.json()
    setUsers(allUsers)
  }

  const deleteUser = async (id) => {
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

        fetch(`http://localhost:8080/api/users/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}` 
          },
        })
          .then(res => res.json())
          .then(res => {
            if (res.status === 200) {
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
          setRefreshUsers(true)
      } else if (
        /* Read more about handling dismissals below */
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
    getAllUsers()
    setRefreshUsers(false)
  }, [refreshUsers])


  return (
    <>
     <Link to={'/createUser'} className='btn btn-primary'>Crear Nuevo Usuario</Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Usuario</th>
            <th scope="col">Role</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((usuario) =>
              <tr>
                <th scope="row">{usuario._id}</th>
                <td>{usuario.nombre}</td>
                <td>{usuario.usuario}</td>
                <td>{usuario.role}</td>
                <td>
                  <Link to={`/editUser/${usuario._id}`} className='btn btn-success'>Editar</Link>
                  <button className='btn btn-danger' onClick={() => deleteUser(usuario._id)}>Eliminar</button>
                </td>
              </tr>
            )
          }

        </tbody>
      </table>
    </>
  )
}

export default AdminUserPage
