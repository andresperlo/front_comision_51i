import React from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import ContactPage from '../pages/ContactPage'
import ErrorPage from '../pages/ErrorPage'
import RegisterPage from '../pages/RegisterPage'
import ProductPage from '../pages/ProductPage'
import LoginPage from '../pages/LoginPage'
import UserPage from '../pages/UserPage'
import AdminPage from '../pages/AdminPage'
import EditPage from '../pages/EditPage'
import CreateProdPage from '../pages/CreateProdPage'
import AdminUserPage from '../pages/AdminUserPage'
import EditUserPage from '../pages/EditUserPage'
import CreateUserPage from '../pages/CreateUserPage'
import CartPage from '../pages/CartPage'
import PrivateRoute from '../components/PrivateRoutes'


const RoutesView = () => {
  return (
    <Routes>
      <Route path='/user' element={
        <PrivateRoute role={'user'}>
          <UserPage />
        </PrivateRoute>
      }>
      </Route>

      <Route path='/' element={<HomePage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/contact' element={<ContactPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/login' element={<LoginPage />} />

      <Route path='/admin' element={
        <PrivateRoute role='admin'>
          <AdminPage />
        </PrivateRoute>
      } />
      <Route path='/product/:id' element={
        <PrivateRoute role='user'>
          <ProductPage />
        </PrivateRoute>
      } />
      <Route path='/edit/:id' element={
        <PrivateRoute role='admin'>
          <EditPage />
        </PrivateRoute>
      } />
      <Route path='/editUser/:id' element={
        <PrivateRoute role='admin'>
          <EditUserPage />
        </PrivateRoute>
      } />
      <Route path='/createProd' element={
        <PrivateRoute role='admin'>
          <CreateProdPage />
        </PrivateRoute>
      } />
      <Route path='/createUser' element={
        <PrivateRoute role='admin'>
          <CreateUserPage />
        </PrivateRoute>
      } />
      <Route path='/adminUsers' element={
        <PrivateRoute role='admin'>
          <AdminUserPage />
        </PrivateRoute>
      }/>
      
      <Route path='/cartUser' element={
        <PrivateRoute role={'user'}>
          <CartPage />
        </PrivateRoute>
      } />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  )
}

export default RoutesView
