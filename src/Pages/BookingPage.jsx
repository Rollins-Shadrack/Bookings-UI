import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PlaceGallery from '../Components/PlaceGallery'
import { differenceInCalendarDays, format } from 'date-fns'

const BookingPage = () => {
    const {id} = useParams();
    const [booking, setBooking] = useState([])
    useEffect(() =>{
      if(id){
        axios.get('/bookings/booking').then(response =>{
          const foundBooking = response.data.filter(({_id}) => _id === id)
          if(foundBooking){
            setBooking(foundBooking)
          }
        })
      }
    },[id])

    if(booking.length === 0){
      return  <div>Loading...</div>;
    }
    console.log(booking)
  return (
    <>
    {booking  && (
      <div className="container mb-5">
        <h1>{booking[0].place.title}</h1>
        <div style={{background:"rgba(0,0,0,0.2)"}} className='py-3 rounded-2  mb-2 container'>
          <h5 className="text-lead">Your booking Information</h5>
          <div style={{float:"right"}}>
            <p style={{background:"#293855", color:"#c2e7c9"}} className='rounded-1 px-3 py-1'>Total price: <br /> <span className='fs-4 fw-bold'>${booking[0].price}</span> </p>
            </div>
          <i className="fa fa-calendar"></i> {format(new Date(booking[0].checkIn), 'yyyy-MM-dd')}  <span className='fw-bold'><i className="fa fa-arrow-right"></i></span> <i className="fa fa-calendar"></i>  {format(new Date(booking[0].checkOut), 'yyyy-MM-dd')}
            <p className="fw-bold"><i className="fa fa-moon"></i> {differenceInCalendarDays(new Date(booking[0].checkOut), new Date(booking[0].checkIn))} nights </p>
            
        </div>
        <PlaceGallery place={booking[0].place}/>
        <div>
          <div>
            <h4>Description</h4>
            {booking[0].place.description}
          </div>
          <div className="mt-3">
            <h4>Extra Info</h4>
            {booking[0].place.extraInfo}
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default BookingPage