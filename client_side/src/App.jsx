import React from 'react'
import Login from './component/Login'
import Register from './component/Register'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './component/Home'
import FooterComponent from './component/FooterComponent'


const App = () => {
  return (
   

 
     <Routes>
      <Route path="/" element={<Login/>}/>
       <Route path="/register" element={<Register/>}/>
       <Route path="/home" element={<Home/>}/>
    </Routes> 
    
   
  )
}

export default App
