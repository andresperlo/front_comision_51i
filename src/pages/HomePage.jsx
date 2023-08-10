import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { arrayProductos } from '../data/arrayProductos'
import axios from 'axios';

const HomePage = () => {

  const [products, setProducts] = useState([])

  const getAllProducts = async () => {
    const res = await fetch('http://localhost:8080/api/products')
    const {getAllProd} = await res.json()
    setProducts(getAllProd)
    /*  const res = axios.get('') */
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

