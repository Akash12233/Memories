import React from 'react';
import { Link } from 'react-router-dom';
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, Box , useDisclosure} from '@chakra-ui/react';
import { Drawer, DrawerBody, Flex, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/react';

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <nav className="bg-white-500 p-4 text-silver flex justify-between flex-wrap">
            <div className="flex items-center justify-between w-full">
                <Link to="/" className="text-3xl font-extrabold italic text-purple-300 hover:bg-white hover:text-purple-500 p-2 rounded">Memories</Link>
                <button className="block md:hidden border border-purple-500 rounded p-2 hover:bg-purple-500 hover:text-white focus:outline-none" onClick={onOpen}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            
            <div className="w-full hidden md:flex md:items-center md:w-auto">
                <div className="text-center md:flex-grow">
                    <Link to="/" className="block md:inline-block hover:bg-white hover:text-purple-500 p-4 rounded">Home</Link>
                    <Popover isLazy>
                        <PopoverTrigger>
                            <div className="block md:inline-block hover:bg-white hover:text-purple-500 p-4 rounded">Pricing</div>
                        </PopoverTrigger>
                        <PopoverContent>
                            <Box>
                                <Link to="/pricing" className="block md:inline-block hover:bg-white hover:text-purple-500 p-4 rounded"><PopoverHeader fontWeight='semibold'>Personal</PopoverHeader></Link>
                                <Link to="/pricing" className="block md:inline-block hover:bg-white hover:text-purple-500 p-4 rounded"><PopoverHeader fontWeight='semibold'>Business</PopoverHeader></Link>
                            </Box>
                        </PopoverContent>
                    </Popover>
                    <Link to="/faq" className="block md:inline-block hover:bg-white hover:text-purple-500 p-4 rounded">FAQ</Link>
                    <Link to="/about" className="block md:inline-block hover:bg-white hover:text-purple-500 p-4 rounded">About Us</Link>
                </div>
                <div>
                    <Link to="/loginpage" className="block md:inline-block">
                        <button className="bg-white-500 hover:bg-purple-600 text-purple border border-purple-500 hover:border-purple-600 p-4 rounded-full shadow-2xl pl-6 pr-6">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
            </div>
        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader className="text-3xl font-extrabold italic text-purple-300 hover:bg-white hover:text-purple-500 p-2 rounded">Memories</DrawerHeader>
          <DrawerBody>
            <Flex flexDir="column">
            <Link to="/" onClick={onClose} className="block md:inline-block hover:bg-white hover:text-purple-500 p-4 rounded">
              Home
            </Link>
            <Link to="/pricing"  onClick={onClose} className="block md:inline-block hover:bg-white hover:text-purple-500 p-4 rounded">
              Pricing
            </Link>
            <Link to="/faq"  onClick={onClose} className="block md:inline-block hover:bg-white hover:text-purple-500 p-4 rounded">
              FAQ
            </Link>
            <Link to="/about"  onClick={onClose} className="block md:inline-block hover:bg-white hover:text-purple-500 p-4 rounded">
              About Us
            </Link>
            <Link to="/loginpage"  onClick={onClose}>
            <button className="bg-white-500 hover:bg-purple-600 text-purple border border-purple-500 hover:border-purple-600 p-2 my-5 rounded-full shadow-2xl pl-6 pr-6">
              Login
            </button>
            </Link>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
        </nav>
    );
}

export default Navbar;
