import React from 'react'
import { FaUser, FaSearch, FaShoppingBag } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
   <div>
  <nav className=" w-full border-b-1 shadow-2xl px-6 py-5 flex items-center ">

 
    <div className="flex-1">
      <h1 className="text-3xl font-semibold">
        Ecommerce
      </h1>
    </div>

   
    <div className="flex-1 flex justify-center space-x-6">
      <a className="text-gray-800 text-lg font-medium hover:text-black hover:underline" href="#">Home</a>
      <a className="text-gray-800 text-lg font-medium hover:text-black hover:underline" href="#">Items</a>
      <a className="text-gray-800 text-lg font-medium hover:text-black hover:underline" href="#">Product</a>
      <a className="text-gray-800 text-lg font-medium hover:text-black hover:underline" href="#">Contact</a>
    </div>

    
    <div className="flex-1 flex justify-end items-center space-x-5">
     <Link to={"/"}> <FaSearch size={20} /> </Link>
      <FaUser size={21} />
      <FaShoppingBag size={21} />
    </div>

  </nav>
</div>

  )
}

export default Navbar
