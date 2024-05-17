import { ChakraProvider,  Grid, GridItem, Box,Button, Input, InputGroup, InputLeftElement, Image,Text, Spinner, List } from '@chakra-ui/react';
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
    axios.get('/api/event/geteventbyuser')
    .then((response) => {
      console.log(response.data.data);
      setevent(response.data.data);
    })
    .catch((error) => {
      console.error(error);
      //navigate(/);
    });
    
  },[]);

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
                    <List key={event.id}>
                    <Link to={`/eventhome/${event.id}`}>
                    <Box maxW="300px" borderWidth="1px" borderRadius="lg" overflow="hidden" m="2">
                    <Image src={event.banner_url}/>
                    <Box p="4">
                      <Text fontSize="xl" fontWeight="bold" mb="2">{event.event_name}</Text>
                      <Text fontSize="sm" color="gray.500" mb="2">{event.event_description}</Text>                    
                    </Box>
                  </Box>
                  </Link>
                  </List>
                    
                  )) : Spinner}
                </Box>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
};

export default Homepage;
