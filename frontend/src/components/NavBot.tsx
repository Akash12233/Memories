// Navbar.jsx
import React from 'react';
import { ChakraProvider, CSSReset, Box, Flex, IconButton, Text, VStack } from '@chakra-ui/react';
import { InfoIcon, ViewIcon, CalendarIcon, SunIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
 
const NavBot :React.FC =  () => {
  return (
    <ChakraProvider>
      <CSSReset />
      <Box bg="violet" p={4} color="white">
        <Flex align="center">
          <VStack spacing={1} align="center" mx={"150px"}>
            {/* EventHome Section */}
            <Link to="/event">
            <IconButton icon={<InfoIcon/>} aria-label="EventHome" />
            <Text fontSize="xs">EventHome</Text>
            </Link>
          </VStack>

          <VStack spacing={1} align="center" mx={'150px'}>
            {/* Media Section */}
            <Link to="/media">
            <IconButton icon={<ViewIcon />} aria-label="Media" />
            <Text fontSize="xs">Media</Text>
            </Link>
          </VStack>

          <VStack spacing={1} align="center" mx={'150px'}>
            {/* SubEvent Section */}
            <Link to='/subevent'>
            <IconButton icon={<CalendarIcon />} aria-label="SubEvent" />
            <Text fontSize="xs">SubEvent</Text></Link>
          </VStack>

          <VStack spacing={1} align="center" mx={'150px'}>
            {/* Guest Section */}
            <Link to='/guest'>
            <IconButton icon={<SunIcon/>} aria-label="Guest" />
            <Text fontSize="xs">Guest</Text></Link>
          </VStack>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default NavBot;
