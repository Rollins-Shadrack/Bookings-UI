import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import BookingWidget from '../Components/BookingWidget';
import PlaceGallery from '../Components/PlaceGallery';

const PlacePage = () => {
    const {id}  = useParams(); 
    const [place, setPlace] = useState(null)
    useEffect(() =>{
        if(!id){
            return
        }
        axios.get(`/places/${id}`).then(response =>{
            setPlace(response.data)
        })
    },[id])
    if(!place) return ''
  return (
    <div className="my-3 container">
        <h3 style={{background:"rgba(0,0,0,0.1)"}} className="container py-2 px-3">{place.title}</h3>
        <a style={{color:"black", fontWeight:"bold"}} target='blank' href={`https://maps.google.com/?q=${place.address}`}> <i className="fa fa-location"></i>  <u>{place.address}</u></a>
        <PlaceGallery place={place}/>

        <div className="row mt-4">
            <div className="col-md-8">
            <div className="my-3">
            <h4 className="fw-bold">Description</h4>
            {place.description}
            </div>
                <p>Check-in: <span className="fw-bold">{place.checkIn}</span> <br /> Check-out: <span className="fw-bold">{place.checkOut}</span> <br /> Max number of guests : <span className="fw-bold" >{place.maxGuests}</span></p>
            </div>
            <div className="col-md-4">
                <BookingWidget place={place}/>
            </div>
            <div className="mt-3">
                <h4 className="fw-bold">Extra Info</h4>
                <p style={{fontSize:"13px", color:"rgba(0,0,0,0.7)"}}>{place.extraInfo}</p>
            </div>
        </div>
    </div>
  )
}

export default PlacePage