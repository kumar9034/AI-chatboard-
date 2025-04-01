import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/Axios';
import { UserContext } from '../context/user.context';

const Register = () => {
        const [email, setemail] = useState()
        const [username, setusername] = useState()
        const [password, setpassword] = useState()


        const {set} = useContext(UserContext)

        const navigation = useNavigate()
        const submithandle = (e)=>{
            e.preventDefault()
            
            axios.post("/user/register", {
                email,
                username,
                password
            }).then((res)=>{
                const response = res.data.data 
                console.log(response);
                localStorage.setItem('token', response.token)
                set(resp)
                navigation("/login")
            }).catch((err)=>{
                console.log(err.response)
            })
        }
   
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form 
        onSubmit={submithandle}
        className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
            onChange={(e)=> setemail(e.target.value)}
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-1 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
            onChange={(e)=> setusername(e.target.value)}
              type="text"
              id="username"
              className="w-full px-4 py-2 mt-1 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
            onChange={(e)=> setpassword(e.target.value)}
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-1 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center">
          Already have a account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

