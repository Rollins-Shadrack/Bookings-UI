import React, {useEffect, useState} from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import './header.css'
import {Button, Form, Spinner} from 'react-bootstrap';
import PerksLabel from './PerksLabel';
import axios from 'axios';
import PhotosUploader from './PhotosUploader';
import AccountNav from './AccountNav';

const PlacesFormPage = () => {
    const {id} = useParams()
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [price, setPrice] = useState(100)
    const [maxGuests, setMaxGuests] = useState(1)
    const [addedPhotos, setAddedPhotos] = useState([])
    const [redirect, setRedirect] = useState(false)

    useEffect(()=>{
        if(!id){
            return
        }
        axios.get(`/places/${id}`).then(response =>{
            const {data} = response
            setTitle(data.title)
            setAddress(data.address)
            setDescription(data.description)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxGuests(data.maxGuests)
            setAddedPhotos(data.photos)
            setPrice(data.price)

        })
    },[id])
    const inputHeader = (text) =>{
        return(
            <h5 className="text-xl mt-2">{text}</h5>
        )
    }
    const inputDescription = (text) =>{
        return(
            <p className='text-secondary fs-10'>{text}</p>
        )
    }
    const preInput = (header, description2 ) =>{
        return(
            <>
                {inputHeader(header)}
                {inputDescription(description2)}
            </>
        )
    }

    if(redirect){
        return <Navigate to='/account/places'/>
    }

    const savePlace = async(ev) =>{
        ev.preventDefault()
        const placeData = {title, address, addedPhotos, description,perks, extraInfo, checkIn, checkOut, maxGuests,price}
        if(id){
            await axios.put(`/places/update-place/${id}`, placeData)

        }else{
            await axios.post('/places/newplaces', placeData)
        }
        setRedirect(true)
    }
  return (
    <div>
        <AccountNav/>
        <Form onSubmit={savePlace}  className="container">
        <Form.Group className="mb-3" controlId="formBasicTitle">
            {preInput('Title', 'Title for your place. Should be short and catchy as in advertisement')}
        <Form.Control value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="title, for example: My lovely apartment" name="title" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAddress">
        {preInput('Address', 'Address to this place')}
        <Form.Control  value={address} onChange={e => setAddress(e.target.value)} type="text" placeholder="address" name="address" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhoto">
        {preInput('Photos', 'more = better')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
        {preInput('Description', 'Description of the place')}
        <textarea  value={description} onChange={e => setDescription(e.target.value)} style={{width:"100%", border:"1px solid gray", borderRadius:"10px"}} className='w-full' name="" id="" rows={'2'}></textarea>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPerks">
        {preInput('Perks', 'Select all the perks of your place')} 
        <PerksLabel selected={perks} onChange={setPerks}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicExtraInfo">
        {preInput('Extra Info', 'House rules, etc')} 
        <textarea  value={extraInfo} onChange={e => setExtraInfo(e.target.value)} style={{width:"100%", border:"1px solid gray", borderRadius:"10px"}} className='w-full' name="" id="" rows={'2'}></textarea>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasiccheck">
        {preInput('Check In & Out times, max guests', 'Add check in and out time, remember to have some time window for cleaning the room between guests')} 
        <div style={{display:"flex", justifyContent:"space-between"}} className="mt-2 g-2 row row-cols-1 row-cols-md-6 row-cols-lg-12  ">
            <div >
                <h6>Check in times</h6>
                <input type="text"  value={checkIn} onChange={e => setCheckIn(e.target.value)} placeholder='12:00' />
            </div>
            <div >
                <h6>Check out times</h6>
                <input type="text"  value={checkOut} onChange={e => setCheckOut(e.target.value)} placeholder='09:00' />
            </div>
            <div >
                <h6>Max number of guests</h6>
                <input type="number"  value={maxGuests} onChange={e => setMaxGuests(e.target.value)} />
            </div>
            <div >
                <h6>Price Per Night</h6>
                <input type="number"  value={price} onChange={e => setPrice(e.target.value)} />
            </div>
        </div>
        </Form.Group>


        <Button style={{background:"#293855", color:"#c2e7c9"}} type="submit" className='mb-5' >
        Save
        </Button>
    </Form>
    </div>
  )
}

export default PlacesFormPage