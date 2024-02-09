import { Flex, Image, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavVer :React.FC=()=>{

    return(
        <>
            <Flex direction="column">
            <Box p="4" mb="4" >
            <Link to="/general" className="hover:bg-white hover:text-purple-500 ">
                <Flex align={'center'}>
                        <Image src="./public/icon8.png" alt="Profile Icon" boxSize="4" mr="2" /> General
                </Flex>
                </Link>
            </Box>
            <Box p="4" mb="4"  >
            <Link to="/Whatsapp" className="hover:bg-white hover:text-purple-500">
                <Flex align={'center'}>
                            <Image src="./public/profile.jpg" alt="Profile Icon" boxSize="4" mr="2" /> Whatsapp
                </Flex>
                </Link>
            </Box>
            <Box p="4" mb="4" >
            <Link to="/sharing" className="hover:bg-white hover:text-purple-500">
                <Flex align={'center'}>
                            <Image src="./public/myaccount.jpg" alt="Profile Icon" boxSize="4" mr="2" /> MySharing
                </Flex>
                </Link>
            </Box>
            </Flex>

        </>
    )
}

export default NavVer;