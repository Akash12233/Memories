import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black py-8">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    {/* Memories Section */}
                    <div className="memories-section mb-4 md:mb-0">
                        <h2 className="text-3xl font-extrabold italic text-white">Memories</h2>
                        <p className="text-white py-2">Event Experience Platform</p>
                    </div>

                    {/* Company Section */}
                    <div className="company-section bg-black text-white md:py-8">
                        <div className="company-heading">
                            <h4 className="text-2xl font-bold">Company</h4>
                        </div>
                        <div className="company-subsection mt-4">
                            <p><Link to="/" className="hover:text-purple-500">About Us</Link></p>
                            <p><Link to="/" className="hover:text-purple-500">Contact Us</Link></p>
                        </div>
                    </div>
                </div>

                <div className="copyright mt-8 text-white">
                    <p>&copy; 2024 Memories.pvt Ltd. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
