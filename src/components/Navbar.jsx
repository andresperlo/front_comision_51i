import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate()
  const token = JSON.parse(localStorage.getItem('token')) || ''
  const role = JSON.parse(localStorage.getItem('role')) || ''

  const handleClick = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    setTimeout(() => {
      navigate('/')
    }, 1000);
  }


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to={role === 'admin' ? '/admin' : role === 'user' ? '/user' : '/'}>Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to={role === 'admin' ? '/admin' : role === 'user' ? '/user' : '/'}>Inicio</NavLink>
              </li>
              {
                token && role === 'admin'
                  ?
                  (
                    <>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/adminUsers">Ver Usuarios</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/createProd">Crear Producto</NavLink>
                      </li>
                    </>
                  )
                  :
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/about">Sobre Nosotros</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/contact">Contacto</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/cartUser">Carrito</NavLink>
                    </li>

                  </>
              }
              {
                token && role === 'admin' || token && role === 'user'
                  ?
                  <NavLink className="nav-link" onClick={handleClick}>Cerrar Sesion</NavLink>
                  :
                  <>
                    <div className='d-flex'>
                      <NavLink className="nav-link" to="/login">Iniciar Sesion</NavLink>
                      <NavLink className="nav-link" to="/register">Registrarse</NavLink>
                    </div>
                  </>
              }
            </ul>

          </div>
        </div>

      </nav>

    </>
  );
}

export default Navbar
