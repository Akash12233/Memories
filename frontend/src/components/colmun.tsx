import { Flex, Image, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Column :React.FC=()=>{

    return(
        <>
            <Flex direction="column">
            <Box p="4" mb="4" >
            <Link to="/homepage" className="hover:bg-white hover:text-purple-500 ">
                <Flex align={'center'}>
                        <Image src="./public/icon8.png" alt="Profile Icon" boxSize="4" mr="2" /> Dashboard
                </Flex>
                </Link>
            </Box>
            <Box p="4" mb="4"  >
            <Link to="/profile" className="hover:bg-white hover:text-purple-500">
                <Flex align={'center'}>
                            <Image src="./public/profile.jpg" alt="Profile Icon" boxSize="4" mr="2" /> Profile
                </Flex>
                </Link>
            </Box>
            <Box p="4" mb="4" >
            <Link to="/myaccount" className="hover:bg-white hover:text-purple-500">
                <Flex align={'center'}>
                            <Image src="./public/myaccount.jpg" alt="Profile Icon" boxSize="4" mr="2" /> Myaccount
                </Flex>
                </Link>
            </Box>

            </Flex>

        </>
    )
}

export default Column;