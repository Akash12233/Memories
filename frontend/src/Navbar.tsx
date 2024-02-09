// src/Navigation.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader } from '@chakra-ui/react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white-500 p-4 text-silver flex justify-between ">
     <Link to="/" className="text-3xl font-extrabold italic text-purple-300 hover:bg-white hover:text-purple-500 p-2 rounded">Memories</Link>

     <div className="flex space-x-32  items-center mr-80"> 
        <Link to="/" className="hover:bg-white hover:text-purple-500 p-2 rounded border-none">Home</Link>
        <Popover isLazy>
        <PopoverTrigger>
              <div className="hover:bg-white hover:text-purple-500 p-2 rounded">Pricing</div>
              </PopoverTrigger>
        <PopoverContent>
        <Link to="/pricing" className="hover:bg-white hover:text-purple-500 p-2 rounded">  <PopoverHeader fontWeight='semibold'>Personal</PopoverHeader></Link>
        <Link to="/pricing" className="hover:bg-white hover:text-purple-500 p-2 rounded">  <PopoverHeader fontWeight='semibold'>Business</PopoverHeader></Link>
        </PopoverContent>
      </Popover>
        <Link to="/faq" className="hover:bg-white hover:text-purple-500 p-2 rounded">FAQ</Link>
        <Link to="/about" className="hover:bg-white hover:text-purple-500 p-2 rounded">About Us</Link>

      <Link to="/loginpage">  <button className="bg-white-500 hover:bg-purple-600 text-purple border border-purple-500 hover:border-purple-600 p-2 rounded-full shadow-2xl pl-6 pr-6">
            Login
        </button></Link>
        </div>

    </nav>
  );
}

export default Navbar;
