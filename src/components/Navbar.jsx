
import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constant'
import { removeUser } from '../utils/userSlice'
import { removeFeed } from '../utils/feedSlice'


const Navbar = () => {
  //subscribing to the store
  const user = useSelector((store)=>store.user)
  //console.log(user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = async() =>{
    const res = await axios.post(BASE_URL+"/logout", {}, {withCredentials: true})
    dispatch(removeUser())
    dispatch(removeFeed())
    navigate('/login')
    
  }

  return (
    <>
      <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to='/' className="btn btn-ghost text-xl">🤝theSocial</Link>
  </div>
  <div className="flex gap-2 items-center">
  {user && <p>{"Hi, " + " " +user?.data?.firstName +" "+ user?.data?.lastName}</p>}
    {user && <div className="dropdown dropdown-end mx-5">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="user image"
            src={user?.data?.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to ='/profile' className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>}
  </div>
</div>
    </>
  )
}

export default Navbar