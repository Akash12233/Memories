import { ChakraProvider,  Grid, GridItem, Box,Button, Input, InputGroup, InputLeftElement, Image,Text, Spinner } from '@chakra-ui/react';
import NavBar from './NavBar';  // Assuming NavBar and Column are components you've created
import Column from './colmun';
import { SearchIcon, AddIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';

const Homepage = () => {
  
  const [events, setevent] = useState<any>([]);
  const navigate= useNavigate();

  console.log("user");

  
  useEffect(() => {
    // Fetch user data
    try {
      
      axios.get('/api/users/event')
      .then(response => setevent(response.data));

    } catch (error) {
      console.log(error,'Error fetching user data:' );
      //navigate('/');
    }
    
    
  });

  return (
    <ChakraProvider>
      <Grid
        templateAreas={`"header header"
                        "nav main"
                        "nav footer"`}
        gridTemplateRows={'50px 1fr 80px'}
        gridTemplateColumns={'200px 1fr'}
        h='100vh'  // Set the height of the grid to 100% of the viewport height
        gap='1'
        color='blackAlpha.700'
        fontWeight='bold'
      >
        <GridItem pl='2' area={'header'}>
          <NavBar />
        </GridItem>
        <GridItem py={'10'} area={'nav'} h='100%' borderRightColor='purple.300' borderRightWidth='3px'  boxShadow="md" my={'10'} >
            <Column />
        </GridItem>
        <GridItem area={'main'} py={'10'} px={'10'} h='100%' my={'10'}>
                <Box p="4">
                <InputGroup>
                <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input type="text" placeholder="Search..." />
                </InputGroup>
                <Link to="/event">
                <Button mt="4" colorScheme="teal" leftIcon={<AddIcon />}>
                Create Event
                </Button>
                </Link>
                </Box>
                <Box>
                  {events? events.map((event: any) => (
                    <Box maxW="300px" borderWidth="1px" borderRadius="lg" overflow="hidden" m="2">
                    <Image src={event.image}/>
                    <Box p="4">
                      <Text fontSize="xl" fontWeight="bold" mb="2">{event.title}</Text>
                      <Text fontSize="sm" color="gray.500" mb="2">{event.description}</Text>                    
                    </Box>
                  </Box>
                    
                  )) : Spinner}
                </Box>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
};

export default Homepage;
