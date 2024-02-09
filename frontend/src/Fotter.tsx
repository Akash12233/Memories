
import React from 'react'; // Create a CSS file for styling
import { Link } from 'react-router-dom';
const Footer: React.FC = () => {
    return (
      <footer className="bg-black  py-8">
        <div className="flex justify-between items-center">
        {/* Memories Section */}
        <div className="memories-section ml-60">
            <h2 className="text-3xl font-extrabold italic text-white">Memories</h2>
            <p className="text-white py-2">Event Experience Platform</p>
        </div>
        

          {/* Company Section */}
          <div className="company-section bg-black text-white py-8">
        <div className="company-heading mr-80">
            <h4 className="text-2xl font-bold ">Company</h4>
        </div>
        <div className="company-subsection mt-4">
            <p><Link to="/about" className="hover:text-purple-500">About Us</Link></p>
            <p><Link to="/contact" className="hover:text-purple-500">Contact Us</Link></p>
        </div>
        </div>
        </div>
  
        <div className="copyright mt-8 text-white ">
        <p className='ml-60'>&copy; 2024 Memories.pvt Ltd. All rights reserved.</p>
        </div>
      </footer>
    );
  }
  

export default Footer;
