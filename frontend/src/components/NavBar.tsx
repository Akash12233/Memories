import { Link } from "react-router-dom";
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton,  PopoverHeader, PopoverBody,Image ,Flex,Box} from "@chakra-ui/react";

import { useState, useEffect } from 'react';



const NavBar: React.FC=()=>{
    const [user, setUser] = useState<any>(null);
    let userImage ="/icon7.jpg";


    useEffect(() => {
        try {
            const userData = localStorage.getItem('user');
            if (userData) {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
                
            }
        } catch (error) {
            console.error("Error retrieving user data from localStorage:", error);
        }
    }, []);
    
    userImage=user?.avatar_url? user?.avatar_url : userImage;


    return (
        <>
            <Box className="bg-white-500 p-4 text-silver flex justify-between " boxShadow="md">
            <Link to="/" className="text-3xl font-extrabold italic text-purple-300 hover:bg-white hover:text-purple-500 p-2 rounded">Memories</Link>
            <Popover>
            <PopoverTrigger>
                <Flex align={'center'}>
                <div className="hover:bg-white hover:text-purple-500 p-2 rounded">
                {user ? user.firstname : 'Profile'}
                </div>
                <Image src={userImage} alt="Profile Icon" boxSize="8" mr="2" />
                </Flex>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                
                <Link to="/profile" className="hover:bg-white hover:text-purple-500 p-2 rounded">
                    <PopoverHeader fontWeight="semibold">
                    <Flex align={'center'}>
                    <Image src="./public/profile.jpg" alt="Profile Icon" boxSize="4" mr="2" /> Profile
                    </Flex>
                    </PopoverHeader>
                </Link>
                <Link to="/myaccount" className="hover:bg-white hover:text-purple-500 p-2 rounded">
                    <PopoverHeader fontWeight="semibold">
                    <Flex align={'center'}>
                    <Image src="./public/myaccount.jpg" alt="Myaccount Icon" boxSize="4" mr="2" />My Account
                    </Flex>
                    </PopoverHeader>
                </Link>
                <Link to="/logout" className="hover:bg-white hover:text-purple-500 p-2 rounded">
                    <PopoverHeader fontWeight="semibold">
                    <Flex align={'center'}>
                    <Image src="./public/logout.jpg" alt="Logout Icon" boxSize="4" mr="2" />Logout
                    </Flex>
                    </PopoverHeader>
                </Link>
                </PopoverBody>
            </PopoverContent>
            </Popover>
            </Box>
        </>
    )
}

export default NavBar;