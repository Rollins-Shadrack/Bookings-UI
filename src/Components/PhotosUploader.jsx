import React,{useState} from 'react'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import './header.css'

const PhotosUploader = ({addedPhotos, onChange}) => {
    const [photoLink, setPhotoLink] = useState('')
    const addPhotoByLink = async(e) =>{
        e.preventDefault( )
        const{data:filename} = await axios.post('/places/upload-by-link',{link:photoLink})
        onChange(prev =>{
            return [...prev, filename];
        })
        setPhotoLink('')
    }
    const uploadPhoto = async(e) =>{
        const files = e.target.files;
        const data = new FormData();
        for(let i = 0; i < files.length; i++){
            data.append('photos', files[i])
        }
        await axios.post('/places/upload',data,{
            headers:{
                "Content-Type": 'multipart/form-data'
            }
        }).then(response =>{
            const {data:filenames} = response;
            onChange(prev =>{
                return [...prev, ...filenames];
            })
        })
    }

    const removePhoto = async(e,link) =>{
        e.preventDefault()
        onChange([...addedPhotos.filter(photo => photo !== link)])
    }
    const selectAsMainPhoto = async(e, link) =>{
        e.preventDefault()
        const addedPhotosWithoutSelected = [...addedPhotos.filter(photo => photo !== link)]
        const newAddedPhotos = [link,...addedPhotosWithoutSelected]
        onChange(newAddedPhotos)
    }
  return (
    <div>
        <div className="d-flex">
            <Form.Control type="text"  value={photoLink} onChange={e => setPhotoLink(e.target.value)} placeholder="Add using a link .....jpg" name="photo" />
            <button onClick={addPhotoByLink } className=' photobutton1 px-2 mx-2'>Add&nbsp;Photo</button>
            </div>
            
            <div className="mt-2 g-2 row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 row-cols-xxl-8">
                {addedPhotos.length > 0 && addedPhotos.map(link =>(
                    <div className='position-relative' key={link}>
                        <img style={{ width: "100%", minWidth: "185px", height: "100%", maxHeight: "150px", borderRadius: "10px" }} src={`http://localhost:8000/uploads/${link}`} alt="" />
                        <div onClick={(e) => removePhoto(e,link)} style={{cursor:"pointer"}} className="IconBadge text-center pt-1 position-absolute bottom-0 end-0">
                            <i className="fa fa-trash  h5"></i>
                        </div>
                        <div onClick={(e) => selectAsMainPhoto(e,link)} style={{cursor:"pointer"}} className="IconBadge text-center pt-1 position-absolute bottom-0 start-0">
                            {link === addedPhotos[0] && (
                                <i style={{color:"#f2ac20"}} className="fa fa-star  h5"></i>
                            )}
                            {link !== addedPhotos[0] && (
                                <i  className="fa fa-star  h5"></i>
                            )}
                            
                        </div>
                    </div>
                ))}
            <label style={{cursor:"pointer"}} className='photobutton py-2 px-3 text-center'>
                <input type="file" multiple style={{display:"none"}} name="" id="" onChange={uploadPhoto} />
                <i className="fa fa-upload"></i> Upload
            </label>
            </div>
    </div>
  )
}

export default PhotosUploader