import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import clienteAxios from '../utils/axiosClient'

const ProductPage = () => {
  const params = useParams()
  const [product, setProduct] = useState({})

  const getOneProduct = async () => {
    const res = await clienteAxios.get(`/products/${params.id}`)
    setProduct(res.data.getOneProd)
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
