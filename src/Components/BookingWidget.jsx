import React, { useContext, useEffect, useState } from 'react'
import {differenceInCalendarDays} from 'date-fns'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'


const BookingWidget = ({place}) => {
    const {user} = useContext(UserContext)
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [numberOfGuests, setNumberOfGuests] = useState(1)
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [redirect, setRedirect] = useState('')

    useEffect(() => {
        if(user){
            setName(user.name)
        }
    }, [user])
    
    let numberOfNights = 0;
    if(checkIn && checkOut){
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }
    const bookThisPlace = async() =>{
        const bookingData = {place:place._id, checkIn, checkOut, numberOfGuests, name,mobile, price: numberOfNights * place.price }
        await axios.post('/places/booking',bookingData).then(response =>{
            const bookingId = response.data._id 
            setRedirect(`/account/bookings/${bookingId}`)
        })
    }
    if(redirect){
        return <Navigate to={redirect} />
    }
    
  return (
    <div>
        <div style={{background:"rgba(0,0,0,0.1)"}} className="card">
                    <div className="px-3 mt-4 ">
                        <div className="text-center">
                        <h5 >Price: <span className="fw-bold ">${place.price}</span> / per night</h5>
                        </div>
                        <div className="row ">
                        <div className="my-2 col-6">
                            <label htmlFor="">Check in:</label>
                        <input type="date" className='form-control' value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                        </div>
                        <div className="my-2 col-6">
                            <label htmlFor="">Check Out:</label>
                        <input type="date" className='form-control' value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                        </div>
                        </div>
                        <div className="my-2 row">
                            <label htmlFor="">Number of Guests:</label>
                        <input type="number" className='form-control' value={numberOfGuests} onChange={e => setNumberOfGuests(e.target.value)} />
                        {numberOfNights > 0 && (
                            <div className="my-3">
                                <div className="mb-2">
                                <label htmlFor="">Your Full Name:</label>
                                <input type="text" className='form-control' placeholder='John Doe' value={name} onChange={e => setName(e.target.value)} />
                                </div>
                                <div className="mb-2">
                                <label htmlFor="">Your Phone Number:</label>
                                <input type="tel" className='form-control' placeholder='Phone Number' value={mobile} onChange={e => setMobile(e.target.value)} />
                                </div>
                            </div>
                        )}
                        </div>
                        <p onClick={bookThisPlace} className="btn btn-dark">Book this place
                        {numberOfNights > 0 &&(
                            <span> ${numberOfNights * place.price}</span>
                        )}
                        </p>
                    </div>
                </div>
    </div>
  )
}

export default BookingWidget