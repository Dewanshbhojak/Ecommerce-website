import React from 'react'
import Login from './component/Login'
import Register from './component/Register'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

const App = () => {
  return (
   
  
    <Routes>
      <Route path="/" element={<Login/>}/>
       <Route path="/register" element={<Register/>}/>
    </Routes>
   
  )
}

export default App
