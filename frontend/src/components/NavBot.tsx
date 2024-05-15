import React from 'react';
import { ChakraProvider, CSSReset, Box, Flex, IconButton, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
import { InfoIcon, ViewIcon, CalendarIcon, SunIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const NavBot: React.FC = () => {
  const iconSize = useBreakpointValue({ base: "md", md: "lg" });
  const textSize = useBreakpointValue({ base: "xs", md: "sm" });

  return (
    <ChakraProvider>
      <CSSReset />
      <Box bg="violet" p={4} color="white">
        <Flex align="center" justify="space-around">
          <Link to="/eventhome">
            <VStack spacing={1} align="center">
              <IconButton icon={<InfoIcon />} aria-label="EventHome" size={iconSize} />
              <Text fontSize={textSize}>EventHome</Text>
            </VStack>
          </Link>

          <Link to="/media">
            <VStack spacing={1} align="center">
              <IconButton icon={<ViewIcon />} aria-label="Media" size={iconSize} />
              <Text fontSize={textSize}>Media</Text>
            </VStack>
          </Link>

          <Link to='/subevent'>
            <VStack spacing={1} align="center">
              <IconButton icon={<CalendarIcon />} aria-label="SubEvent" size={iconSize} />
              <Text fontSize={textSize}>SubEvent</Text>
            </VStack>
          </Link>

          <Link to='/guest'>
            <VStack spacing={1} align="center">
              <IconButton icon={<SunIcon />} aria-label="Guest" size={iconSize} />
              <Text fontSize={textSize}>Guest</Text>
            </VStack>
          </Link>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default NavBot;
