import React, { useState } from 'react'

const PlaceGallery = ({place}) => {
    const [showAllPhotos, setShowAllPhotos] = useState(false)
    if(showAllPhotos){
        return(
            <div  className={` container `}>
            <h3>{place.title}</h3>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }} className="container text-center">
                <div onClick={() => setShowAllPhotos(false)} className="">
                    <p className="btn btn-light " style={{ top: "10px", right: "10px", zIndex: "9999" }}>
                        <i className="fa fa-times"></i> Close Photos
                    </p>
                </div>
                {place?.photos?.length > 0 && place.photos.map((photo) => (
                    <div className="text-center">
                        <img style={{ width: "80%", height: "auto", maxWidth: "100%", maxHeight: "80vh" }} className="mb-4" src={`http://localhost:8000/uploads/${photo}`} alt="" />
                    </div>
                ))}
            </div>
            </div>
        )
    }
  return (
    <div className="position-relative">
        <div style={{height:"30%", width:"100%", borderRadius:"20px"}} className="row mb-3 rounded">
            <div className="col-sm-9 g-2">
                {place.photos?.[0] && (
                    <img onClick={() => setShowAllPhotos(true)} style={{height:"calc(430px)", width:"100%", cursor:"pointer"}} src={`http://localhost:8000/uploads/${place.photos?.[0]}`} alt="" />
                )}
            </div>
            <div className="col-sm-3 g-2">
                <div className="row mb-2">
                {place.photos?.[1] && (
                    <img onClick={() => setShowAllPhotos(true)} style={{height:"calc(210px)", width:"100%", cursor:"pointer"}} src={`http://localhost:8000/uploads/${place.photos?.[1]}`} alt="" />
                )}
                </div>
                <div className="row">
                {place.photos?.[2] && (
                    <img onClick={() => setShowAllPhotos(true)} style={{height:"calc(210px)", width:"100%", cursor:"pointer"}} src={`http://localhost:8000/uploads/${place.photos?.[2]}`} alt="" />
                )}
                </div>
            </div>
        </div>
        <p onClick={() => setShowAllPhotos(true)} className="position-absolute bottom-0 end-0 mx-4 btn btn-light"><i className="fa fa-image"></i> Show More Photos</p>
        </div>
  )
}

export default PlaceGallery