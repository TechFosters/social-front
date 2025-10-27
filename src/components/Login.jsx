import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constant'

const Login = () => {

    const [emailId, setEmailId] = useState('ajay@social.com')
    const [password, setPassword] = useState('Ajay@1234')
    const [message, setMessage] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin = async() =>{
      try{
        const res = await axios.post(BASE_URL+'/login', {
          emailId,
          password
        }, {withCredentials: true})
        console.log(res.data); // check response
        setMessage("✅ Login successful!");
        dispatch(addUser(res.data))
        return navigate('/')
      }catch(err){
        console.error("Login error:", err);
        setMessage("❌ Login failed: " + (err.response?.data?.error || err.message));
      }
    }

  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-64px)]'>

  <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-9">
  <legend className="fieldset-legend">Login</legend>

  <label className="label">Email</label>
  <input type="email" className="input" placeholder="Email" value ={emailId} onChange={(e)=>setEmailId(e.target.value)} />

  <label className="label">Password</label>
  <input type="password" className="input" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value )} />

  <button className="btn btn-accent mt-4" onClick={handleLogin}> Login</button>
  {message && (
          <p className="text-center mt-2 text-sm text-gray-600">{message}</p>
        )}
</fieldset>
</div>
  )
}

export default Login