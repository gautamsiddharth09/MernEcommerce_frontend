import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
      <h1>Get Exlusive Offer On Your Email</h1>
      <p>Subscribe to our newsletter and stay updatedd</p>
      <input className='subscribe' type='email' placeholder=' Your Email id'/>
      <button className='btnSubscribe'>Subscribe</button>
    </div>
  )
}

export default NewsLetter