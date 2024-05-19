import { Link } from "react-router-dom";
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton,  PopoverHeader, PopoverBody,Image ,Flex,Box, Button} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext.tsx";
import { useNavigate } from "react-router-dom";


const NavBar: React.FC=({ profile, memories })=>{
    const [user, setUser] = useState<any>(null);
    let userImage ="/icon7.jpg";
    const navigate = useNavigate();
    const {dispatch} = useAuthContext();
    useEffect(() => {
        axios.get('/api/user/current-user')
        .then(response => {
            setUser(response.data.data);
        
        })
        .catch(error => {
            console.log(error);
        })
    }, []);
    const link = memories ? '/homepage' : '/';
    userImage=user?.avatar_url? user?.avatar_url : userImage;

    const handlelogout = () => {
        axios.post('/api/user/logout')
        .then(response => {
            setUser(null); // Assuming setUser is a function to update the user state
            localStorage.removeItem("user");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");
            dispatch({ type: "LOGOUT", payload: null, refreshToken: null, accessToken: null });
            navigate('/');
    
        })
        .catch(error => {
            console.log(error.message);
        })
    }


    return (
        <>
            <Box className="bg-white-500 p-4 text-silver flex justify-between " boxShadow="md">
            <Link to={link} className="text-3xl font-extrabold italic text-purple-300 hover:bg-white hover:text-purple-500 p-2 rounded">Memories</Link>
            {profile && 
            <Popover>
            <PopoverTrigger>
                <Flex align={'center'}>
                <div className="hover:bg-white hover:text-purple-500 p-2 rounded">
                {user ? user.firstname : 'Profile'}
                </div>
                <Image src={userImage} alt="Profile Icon" boxSize="8" mr="2" borderRadius={'full'} />
                </Flex>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                
                <Link to="/profile" className="hover:bg-white hover:text-purple-500 p-2 rounded">
                    <PopoverHeader fontWeight="semibold">
                    <Flex align={'center'}>
                    <Image src="/profile.jpg" alt="Profile Icon" boxSize="4" mr="2" /> Profile
                    </Flex>
                    </PopoverHeader>
                </Link>
                <Link to="/myaccount" className="hover:bg-white hover:text-purple-500 p-2 rounded">
                    <PopoverHeader fontWeight="semibold">
                    <Flex align={'center'}>
                    <Image src="/myaccount.jpg" alt="Myaccount Icon" boxSize="4" mr="2" />My Account
                    </Flex>
                    </PopoverHeader>
                </Link>
                <Box onClick={handlelogout} backgroundColor={"transparent"} cursor="pointer">
                    <PopoverHeader fontWeight="semibold">
                    <Flex align={'center'}>
                    <Image src="/logout.jpg" alt="Logout Icon" boxSize="4" mr="2" />Logout
                    </Flex>
                    </PopoverHeader>
                </Box>
                </PopoverBody>
            </PopoverContent>
            </Popover>
            }

            </Box>
        </>
    )
}

export default NavBar;