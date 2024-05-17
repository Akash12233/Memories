import { Flex, Image, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavVer :React.FC=()=>{
    const id = localStorage.getItem("event_id");

    return(
        <>
            <Flex direction="column">
            <Box p="4" mb="4" >
            <Link to={`/general/${id}`} className="hover:bg-white hover:text-purple-500 ">
                <Flex align={'center'}>
                        <Image src="/icon8.png" alt="Profile Icon" boxSize="4" mr="2" /> General
                </Flex>
                </Link>
            </Box>
            <Box p="4" mb="4"  >
            <Link to={`/whatsapp/${id}`} className="hover:bg-white hover:text-purple-500">
                <Flex align={'center'}>
                            <Image src="/profile.jpg" alt="Profile Icon" boxSize="4" mr="2" /> Whatsapp
                </Flex>
                </Link>
            </Box>
            <Box p="4" mb="4" >
            <Link to={`/sharing/${id}`} className="hover:bg-white hover:text-purple-500">
                <Flex align={'center'}>
                            <Image src="/myaccount.jpg" alt="Profile Icon" boxSize="4" mr="2" /> MySharing
                </Flex>
                </Link>
            </Box>
            </Flex>

        </>
    )
}

export default NavVer;