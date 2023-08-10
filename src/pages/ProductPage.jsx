import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ProductPage = () => {
  const params = useParams()
  const [product, setProduct] = useState({})

  const getOneProduct = async () => {
    const res = await fetch(`http://localhost:8080/api/products/${params.id}`)
    const { getOneProd } = await res.json()
    console.log(getOneProd)
    setProduct(getOneProd)
  }

  useEffect(() => {
    getOneProduct()
  }, [])
  return (
    <>
      <h2>Producto</h2>
      <hr />
      <div key={product._id}>
        <h4>{product.nombre}</h4>
        <h4>{product.precio}</h4>
        <h4>{product.codigo}</h4>
      </div>
    </>
  )
}

export default ProductPage
