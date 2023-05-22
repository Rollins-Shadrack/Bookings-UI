import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import './header.css'
import AccountNav from './AccountNav';
import axios from 'axios';
import PlaceImage from './PlaceImage';

const PlacesPage = () => {
  const [places, setPlaces] = useState([])
  useEffect(()=>{
    axios.post('/places').then(({data}) =>{
      setPlaces(data)
    })
  },[])
  return (
    <div>
      <AccountNav/>
      <div className="">
      <div className="text-center">
      <Link className='px-4 py-2 accountNavLink1 ' to='/account/places/new'> <i className="fa fa-plus"></i> Add new Place</Link>
      </div>
      <div className='mt-3 container'>
        {places.length > 0 && places.map(place =>(
          <Link to={`/account/places/${place._id}`} className='hotelLinks py-2 rounded d-flex mb-2' key={place._id}>
            <div className=" mx-2 grow">
              <PlaceImage place={place} />
            </div>
            <div>
            <h4>{place.title}</h4>
            <p style={{fontSize:"13px"}}>{place.description}</p>
            </div>
          </Link>
        ))}
      </div>
      </div>    
    </div>
  )
}

export default PlacesPage