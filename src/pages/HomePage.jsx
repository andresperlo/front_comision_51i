import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import clienteAxios from '../utils/axiosClient';

const HomePage = () => {

  const [products, setProducts] = useState([])

  const getAllProducts = async () => {
    try {
      const res = await clienteAxios.get('/products')
      setProducts(res.data.getAllProd)
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <>
      <h2>Home Page</h2>
      <hr />
      {/*       <img src={img} alt="" /> */}

      <div className="container">
        <div className="row">
          <Card array={products} />
        </div>
      </div>
    </>
  );
}

export default HomePage;

