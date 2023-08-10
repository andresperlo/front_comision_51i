import React from 'react'
import UserMap from './components/UserMap'
import { arrayPersona } from './data/arrayPersonas'
import Contador from './components/Contador'
import Personas from './components/Personas'
import Form from './components/Form'
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
