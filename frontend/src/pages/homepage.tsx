import { ChakraProvider,  Grid, GridItem, Box,Button, Input, InputGroup, InputLeftElement, Image,Text, Spinner, SimpleGrid } from '@chakra-ui/react';
import NavBar from '../components/NavBar';  // Assuming NavBar and Column are components you've created
import Column from '../components/colmun';
import { SearchIcon, AddIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';
import PopupAlert from '../components/message';

const Homepage = () => {
  
  const [events, setevent] = useState<any>([]);
  const navigate= useNavigate();

  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  
  useEffect(() => {
    // Fetch user data
    axios.get('/api/event/geteventbyuser')
    .then((response) => {
      setevent(response.data.data);
    })
    .catch((error) => {
      if(error.message === 'Request failed with status code 401'){
        navigate('/');
      }
      setError('Failed to fetch events');
      
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
          <NavBar {...{ profile : true, memories : true}}/>
        </GridItem>
        <GridItem py={'10'} area={'nav'}   h='100%' borderRightColor='purple.300' borderRightWidth='3px'  boxShadow="md" my={'10'} >
        <Column />
        </GridItem>
        <GridItem area={'main'} py={'10'} px={'10'} h='100%' my={'10'}>
          {error && <PopupAlert message={error} />}
                <Box p="4">
                <InputGroup>
                <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input type="text" placeholder="Search..."  onChange={handleSearchChange}/>
                </InputGroup>
                <Link to="/event">
                <Button mt="4" colorScheme="teal" leftIcon={<AddIcon />}>
                Create Event
                </Button>
                </Link>
                </Box>
                <Box>
                {events.length > 0 ? (
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="4">
                    {events.map((event: any) => (
                      <Box as="article" key={event.id} maxW="300px" borderWidth="1px" borderRadius="lg" overflow="hidden" m="2">
                        <Link to={`/eventhome/${event.id}/${event.user_id}`}>
                          <Image src={event.banner_url} alt={event.event_name} />
                          <Box p="4">
                            <Text fontSize="xl" fontWeight="bold" mb="2">
                              {event.event_name}
                            </Text>
                            <Text fontSize="sm" color="gray.500" mb="2">
                              {event.event_description}
                            </Text>
                          </Box>
                        </Link>
                      </Box>
                    ))}
                  </SimpleGrid>
                ) : (
                  <Spinner />
                )}
                </Box>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
};

export default Homepage;
