import React from 'react'

const PerksLabel = ({selected, onChange}) => {
    const handleCbClick = (ev) =>{
        const{name, checked} = ev.target
        if(checked){
            onChange([...selected, name]);
        }else{
            onChange([...selected.filter(selectedName => selectedName !== name)])
        }
    }
  return (
    <div className="mt-2 row row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-3 row-cols-xxl-8">
        <label  className='border p-2 rounded text-center g-2 cursor-pointer'>
            <input type="checkbox" checked={selected.includes('wifi')} name="wifi" onChange={handleCbClick} />
            <span> <i className="fa fa-wifi"></i> WiFi</span>
        </label>
        <label className='border p-2 rounded text-center g-2 cursor-pointer'>
            <input type="checkbox" checked={selected.includes('parking')} name="parking" onChange={handleCbClick} />
            <span> <i className="fa fa-car"></i>Free parking spot</span>
        </label>
        <label className='border p-2 rounded text-center g-2 cursor-pointer'>
            <input type="checkbox" checked={selected.includes('tv')} name="tv" onChange={handleCbClick} />
            <span> <i className="fa fa-tv"></i>TV</span>
        </label>
        <label className='border p-2 rounded text-center g-2 cursor-pointer'>
            <input type="checkbox" checked={selected.includes('radio')} name="radio" onChange={handleCbClick} />
            <span> <i className="fa fa-indent"></i>Radio</span>
        </label>
        <label className='border p-2 rounded text-center g-2 cursor-pointer'>
            <input type="checkbox" checked={selected.includes('pets')} name="pets" onChange={handleCbClick} />
            <span> <i className="fa fa-thumbs-up"></i>Pets</span>
        </label>
        <label className='border p-2  rounded text-center g-2 cursor-pointer'>
            <input type="checkbox" checked={selected.includes('entrance')} name="entrance" onChange={handleCbClick} />
            <span> <i className="fa fa-user-secret"></i>Private Entrance</span>
        </label>
    </div>
  )
}

export default PerksLabel