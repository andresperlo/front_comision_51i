import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import RoutesView from './routes/RoutesView'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
     <Router>
       <Navbar />
       <RoutesView/>
       <Footer />
     </Router>
    </>
  )
}

export default App
