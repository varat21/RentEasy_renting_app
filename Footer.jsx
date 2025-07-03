import React from 'react';
import { FaFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { AiFillTikTok } from "react-icons/ai";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 shadow-md">
      <div className="container lg:mx-32 md:mx-14 px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Branding */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start">
              <img src="/images/logo.png" alt="RentEasy Logo" className="h-14 md:h-16" />
            </div>
            <p className="mt-4 text-md text-gray-600">
              Making the world a better place through constructing elegant hierarchies.
            </p>
            <div className="flex justify-center md:justify-start gap-4 mt-6">
              <Link to="https://www.facebook.com/">
                <FaFacebook className="h-6 w-6 text-blue-600 hover:text-blue-500 cursor-pointer transition duration-300" />
              </Link>
              <Link to="https://www.instagram.com/accounts/login/?hl=en">
                <FaInstagramSquare className="h-6 w-6 text-pink-600 hover:text-pink-500 cursor-pointer transition duration-300" />
              </Link>
              <Link to="https://x.com/i/flow/login">
                <RiTwitterXLine className="h-6 w-6 text-blue-400 hover:text-blue-300 cursor-pointer transition duration-300" />
              </Link>
              <Link to="https://www.tiktok.com/accounts/login/?hl=en">
                <AiFillTikTok className="h-6 w-6 text-black hover:text-gray-700 cursor-pointer transition duration-300" />
              </Link>
            </div>
          </div>

          {/* Browse Properties */}
          <div>
            <h4 className="text-lg font-medium mb-4 text-black">Browse Properties</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-500">House</a></li>
              <li><a href="#" className="hover:text-blue-500">Apartment</a></li>
              <li><a href="#" className="hover:text-blue-500">Shop House</a></li>
              <li><a href="#" className="hover:text-blue-500">Rooms</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-medium mb-4 text-black">Customer Service Help</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-500">Review</a></li>
              <li><a href="#" className="hover:text-blue-500">Contact</a></li>
              <li><a href="#" className="hover:text-blue-500">List your rental</a></li>
              <li><a href="#" className="hover:text-blue-500">About</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-medium mb-4 text-black">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-500">Terms of service</a></li>
              <li><a href="#" className="hover:text-blue-500">Privacy policy</a></li>
              <li><a href="#" className="hover:text-blue-500">FAQ</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
          <p>© 2025 RentEasy, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
