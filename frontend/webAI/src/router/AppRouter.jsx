import React from 'react'
import {Route, BrowserRouter, Routes} from "react-router-dom"
import Register from '../components/Register'
import Login from '../components/Login'
import Home from '../components/Home'
import Project from '../components/Project'
import UserAuth from '../auth/UserAuth'
 
const AppRouter = () => {

  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<UserAuth><Home/></UserAuth>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/project' element={<Project/>} />
                <Route path='/project/:id' element={<UserAuth><Project/></UserAuth>} /> {/* New dynamic route */}
            </Routes>
        </BrowserRouter>
      
    </div>
  )
}

export default AppRouter
