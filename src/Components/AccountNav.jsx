import React from 'react'
import {  Link, useLocation, useParams } from 'react-router-dom'

const AccountNav = () => {
    const {pathname} = useLocation()
    let subpage = pathname.split('/')?.[2]

    const ClassesState = (type=null) =>{
        let classes = 'px-4 py-2 accountNavLink '
        if(type === subpage ){
          classes += ' active'
        }
        return classes;
      }

      if(subpage === undefined){
        subpage = 'profile'
      }
  return (
    <nav className='w-full d-flex my-3 container justify-content-center'>
        <Link className={ClassesState('profile')} to='/account'><i className="fa fa-user"></i> My Profile</Link>
        <Link className={ClassesState('bookings')} to='/account/bookings'><i className="fa fa-list"></i> My Bookings</Link>
        <Link className={ClassesState('places')} to='/account/places'><i className="fa fa-university"></i> My Accommodations</Link>
      </nav>
  )
}

export default AccountNav