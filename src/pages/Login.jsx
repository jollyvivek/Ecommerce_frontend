import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [currentState,setCurrentState] = useState("Login")
  const {token,setToken} = useContext(ShopContext)
  const navigate = useNavigate()
  const [formData,setFormData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler = (e)=>{
      const {name,value} = e.target
      setFormData(({...formData,[name]:value}))
  }

  const submitHandler = async(e)=>{
    e.preventDefault()
    try {
        if (currentState ==="Sign Up") {
            const response = await axios.post(backendUrl + "api/user/register",formData)
            // console.log("response Signup",response)
            if (response.data.success) {
              setToken(response.data.token)
              localStorage.setItem("token",response.data.token)
              toast.success("Register Successfully !")
              setFormData({name:"",email:"",password:""})
            }else{
              toast.error(response.data.message)
            }          
            
        } else {
            const response = await axios.post(backendUrl + "api/user/login",formData)
            // console.log("response login",response)
            if (response.data.success) {
              navigate('/')
              setToken(response.data.token)
              localStorage.setItem("token",response.data.token)
              toast.success("Login Successfully !")
              setFormData({name:"",email:"",password:""})
            }else{
              toast.error(response.data.message)
            }
        }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // useEffect(()=>{
  //   navigate('/')
  // },[token])

  return (
    <form onSubmit={submitHandler} className=' flex flex-col items-center w-[90%] sm:max-w-96 m-auto  mt-14 gap-4 text-gray-800'>
        <div className=' inline-flex items-center gap-2 mb-2 mt-10'>
            <p className=' prata-regular text-3xl'>{currentState}</p>
            <hr className=' border-none h-[1.5px] w-8 bg-gray-800' />
        </div>
           {currentState === 'Login' ? '' : <input type="text" className=' w-full px-3 py-1.5 border border-gray-500' onChange={onChangeHandler} name='name' value={formData.name} placeholder='Name'  required />}
          <input type="email" className=' w-full px-3 py-1.5 border border-gray-500' onChange={onChangeHandler} name='email' value={formData.email} placeholder='Email' required />
          <input type="password" className=' w-full px-3 py-1.5 border border-gray-500' onChange={onChangeHandler} name='password' value={formData.password} placeholder='Password' required />
          <div className=' w-full flex justify-between text-sm mt-[-8px]'>
            <p className=' cursor-pointer'>Forgot your password</p>
            {
            currentState === 'Login' 
            ? <p onClick={()=>setCurrentState('Sign Up')} className=' cursor-pointer'>Create account</p>
            : <p onClick={()=>setCurrentState('Login')} className=' cursor-pointer'>Login Here</p>        
            }
          </div>
          <button type='submit' className=' bg-black text-white font-light py-2 px-8 mt-2 cursor-pointer '>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
      
      
      
      
      
      
    </form>
  )
}

export default Login