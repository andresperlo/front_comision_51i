import React, { useEffect, useState } from 'react'
import Card from '../components/Card'

const UserPage = () => {
  const [products, setProducts] = useState([])

  const getAllProducts = async () => {
    const res = await fetch('http://localhost:8080/api/products')
    const { getAllProd } = await res.json()
    setProducts(getAllProd)
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
