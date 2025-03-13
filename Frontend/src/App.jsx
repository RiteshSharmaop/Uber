import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {
  Start, 
  Home, 
  UserLogin , 
  UserSignup, 
  CaptainLogin, 
  CaptainSignup , 
  UserProtectedWrapper,
  UserLogout,
  CaptainHome,
  CaptainProtectedWrapper,
  CaptainLogout
} from './pages/pages.js'

const App = () => {
  return (
    <>
      <Routes>
            <Route path='/' element= {<Start />}/>
            <Route path='/login' element= {<UserLogin/>}/>
            <Route path='/signup' element= {<UserSignup/>}/>
            <Route path='/captain-login' element= {<CaptainLogin/>}/>
            <Route path='/captain-signup' element= {<CaptainSignup/>}/>
            <Route path='/home' 
            element= {
              <UserProtectedWrapper>
                <Home/>
              </UserProtectedWrapper>
            }/>
            <Route path='/user/logout' 
            element={
              <UserProtectedWrapper>
                <UserLogout/>
              </UserProtectedWrapper>
            }/>
            <Route path='/captain-home' 
            element= {
              <CaptainProtectedWrapper>
                <CaptainHome/>
              </CaptainProtectedWrapper>
              }/>
            <Route path='/captain/logout' 
            element= {
              <CaptainProtectedWrapper>
                <CaptainLogout/>
              </CaptainProtectedWrapper>
            }/>
      </Routes>

    </>
  )
}

export default App