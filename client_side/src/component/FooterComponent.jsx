import React from 'react'
import { FaFacebook,FaInstagram,FaTwitter,FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
   
      <footer className=' bg-gray-800 text-white p-5 w-full h-full '>
        <div className='grid grid-cols-4 gap-4 border'> 
          <div className='border'><h1 className=''>About Us</h1>
          <br/>
          <p>Your trusted online shopping destination for quality products at great prices.</p>
          <div className='flex justify-left p-4'>
            <FaFacebook className='m-2 '/>
            <FaInstagram className='m-2'/>
            <FaTwitter className='m-2'/>
            <FaLinkedin className='m-2'/>
          </div>
          </div>
          <div className='border w-'><h1>Customer Service</h1>
          <br/>
          <p>Contact Us</p>
          <p>Track Order</p>
          <p>Returns & Exchange</p>
          <p>Shipping Info</p>
          <p>FAQ</p></div>
          <div className='border-2'><h1>Quick Links</h1>
          <br />
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
          <p>Size Guide</p>
          <p> Gift Cards</p>
          <p>Careers</p></div>
          <div className='border-2'><h1>Newsletter</h1>
          <p>Subscribe to get special offers and updates.</p></div>
        </div>
        <hr /> 
        <div className="flex justify-center items-center p-4 mt-4 font-thin text-sm h-10"> 
          <p> © 2026 Your Store. All rights reserved</p>
        </div>
      </footer> 
  
  )
}

export default Footer
