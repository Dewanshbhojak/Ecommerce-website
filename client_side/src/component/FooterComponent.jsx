import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-12 py-12  ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* About */}
        <div>
          <h1 className="text-xl font-semibold mb-3">About Us</h1>
          <p className="text-sm text-gray-300">
            Your trusted online shopping destination for quality products at
            great prices.
          </p>
          <div className="flex space-x-4 mt-6">
            <a href="#"><FaFacebook size={22} /></a>
            <a href="#"><FaInstagram size={22} /></a>
            <a href="#"><FaTwitter size={22} /></a>
            <a href="#"><FaLinkedin size={22} /></a>
          </div>
        </div>

        {/* Customer Service */}
        <div>
          <h1 className="text-xl font-semibold mb-3">Customer Service</h1>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
            <li><a href="#" className="hover:text-white">Track Order</a></li>
            <li><a href="#" className="hover:text-white">Returns & Exchanges</a></li>
            <li><a href="#" className="hover:text-white">Shipping Info</a></li>
            <li><a href="#" className="hover:text-white">FAQ</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h1 className="text-xl font-semibold mb-3">Quick Links</h1>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-white">Size Guide</a></li>
            <li><a href="#" className="hover:text-white">Gift Cards</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h1 className="text-xl font-semibold mb-3">Newsletter</h1>
          <p className="text-sm text-gray-300">
            Subscribe to get special offers and updates.
          </p>
        </div>

      </div>

      <hr className="my-8 border-gray-700" />

      <div className="text-center text-sm text-gray-400">
        © 2026 Your Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
