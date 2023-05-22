import React from 'react'
import './header.css'

const PlaceImage = ({place, index=0}) => {
    if(!place.photos?.length){
        return '';
    }

  return (
    <img  src={`http://localhost:8000/uploads/${place.photos[index]}`} alt="" className='imageInList' />
  )
}

export default PlaceImage