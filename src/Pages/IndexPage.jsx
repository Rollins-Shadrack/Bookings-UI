import React, { useEffect, useState } from 'react'
import './index.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

const IndexPage = () => {
  const [places, setPlaces] = useState([])
  useEffect(() =>{
    axios.post('/places/allplaces').then(response =>{
      setPlaces(response.data)
    })
  },[])
  
  return (
    <div className="container">
      <div className="mt-2  g-4 row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5">
      {places.length > 0 && places.map(place => (
        <Link style={{textDecoration:"none", color:"black"}} to={`/place/${place._id}`} >
          <div>
          {place.photos?.[0] && (
            <img style={{ width: "100%", minWidth: "185px", height: "100%", maxHeight: "170px", borderRadius: "10px" }} src={`http://localhost:8000/uploads/${place.photos?.[0]}`} alt="" />
          )}
          </div>
          <h6 className='text-truncate'>{place.address}</h6>
          <p className='text-truncate '><span className="text-secondary">{place.title}</span>  <br /> <span className="" style={{fontWeight:"bold"}}>${place.price}</span> per night </p>
        </Link>
      ))}
    </div>
    </div>
  )
}

export default IndexPage