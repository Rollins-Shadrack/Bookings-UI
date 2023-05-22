import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import {  Link, Navigate, useLocation, useParams } from 'react-router-dom'
import './index.css'
import axios from 'axios'
import PlacesPage from '../Components/PlacesPage'
import AccountNav from '../Components/AccountNav'

const ProfilePage = () => {
  const {ready, user, setUser} = useContext(UserContext)
  const [redirect, setRedirect] = useState(null)
  const {pathname} = useLocation()
  let subpage = pathname.split('/')?.[2]

  if(!ready){
    return 'Loading...'
  }

  //if we are ready but we dont have a user then we go to login
  if(ready && !user && !redirect){
    return <Navigate to={'/login'}/>
  }

  
const logout = async() =>{
  await axios.post('/users/logout')
  setRedirect('/')
  setUser(null)
}

  if(redirect){
    return <Navigate to={redirect}/>
  }
  return (
    <div>
      <AccountNav/>
        <div className="text-center">
          Logged in as {user.name} <br />
          <button onClick={logout} className="btn btn-outline-danger">Logout</button>
        </div>
    </div>
  )
}

export default ProfilePage