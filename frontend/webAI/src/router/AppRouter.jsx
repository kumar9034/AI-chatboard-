import React from 'react'
import {Route, BrowserRouter, Routes} from "react-router-dom"
import Register from '../components/Register'
import Login from '../components/Login'
import Home from '../components/Home'
import Project from '../components/Project'
 
const AppRouter = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/project' element={<Project/>} />
            </Routes>
        </BrowserRouter>
      
    </div>
  )
}

export default AppRouter
