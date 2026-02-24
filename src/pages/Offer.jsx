import React from 'react'
import './Offer.css'
import exclusive_image from '../assets/exclusive_image.png'

const Offer = () => {
  return (
    <div className='offer'>
      <div className="offer-left">
        <h1>Exlusive</h1>
        <h1>Offer For You</h1>
        <p>ONLY ON BEST SELLERS PRODUCT</p>
        <button>Check Now</button>
      </div>

      <div className="offer-right">
        <img  src={exclusive_image} alt='' />
      </div>
    </div>
  )
}

export default Offer