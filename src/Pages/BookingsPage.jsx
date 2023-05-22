import React, { useEffect, useState } from 'react'
import AccountNav from '../Components/AccountNav'
import axios from 'axios'
import PlaceImage from '../Components/PlaceImage'
import { differenceInCalendarDays, format } from 'date-fns'
import {Link} from 'react-router-dom'

const BookingsPage = () => {
    const [bookings, setBookings] = useState([])

    useEffect(() =>{
        axios.get(`/bookings/booking`).then(response =>{
            setBookings(response.data)
        })
    },[])
  return (
    <div className='container'>
        <AccountNav/>
        <div>
            {bookings.length > 0 && bookings.map(booking =>(
                <Link to={`/account/bookings/${booking._id}`} style={{background: "#293855", color: "#c2e7c9", textDecoration: "none"}} className='py-2 rounded d-flex mb-2'>
                    <div className="px-4 ">
                        <PlaceImage place={booking.place}/>
                    </div>
                <div style={{ width:"100%"}} className="px-4 grow">
                    <h4 className=" mt-2">{booking.place.title}</h4>
                    <div style={{borderTop:"1px solid gray", width:"100%"}}>
                    <i className="fa fa-calendar"></i> {format(new Date(booking.checkIn), 'yyyy-MM-dd')}  <span className='fw-bold'><i className="fa fa-arrow-right"></i></span> <i className="fa fa-calendar"></i>  {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
                    <div>
                    <p className="fw-bold"><i className="fa fa-moon"></i> {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights    &rarr;     <i className="fa fa-credit-card"></i> Total price: ${booking.price}</p>
                    </div>
                    </div>
                </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default BookingsPage