import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {Home , UserLogin , UserSignup, CaptainLogin, CaptainSignup} from './pages/pages.js'
const App = () => {
  return (
    <>
      <Routes>
            <Route path='/' element= {<Home/>}/>
            <Route path='/login' element= {<UserLogin/>}/>
            <Route path='/signup' element= {<UserSignup/>}/>
            <Route path='/captain-login' element= {<CaptainLogin/>}/>
            <Route path='/captain-signup' element= {<CaptainSignup/>}/>

      </Routes>

    </>
  )
}

export default App