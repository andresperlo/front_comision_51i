import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import clienteAxios from '../utils/axiosClient'

const UserPage = () => {
  const [products, setProducts] = useState([])

  const getAllProducts = async () => {
    const res = await clienteAxios.get('/products')
    setProducts(res.data.getAllProd)
  }
  

  useEffect(() => {
    getAllProducts()
  }, [])


  return (
    <>
      <div className="container">
        <div className="row">
          <Card array={products} />
        </div>
      </div>
    </>
  );
}

export default UserPage
