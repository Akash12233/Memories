import { VStack ,HStack,Heading,IconButton,Center} from "@chakra-ui/react";
import NavBar from "./NavBar"
import NavBot from "./NavBot"
import { SettingsIcon } from "@chakra-ui/icons";
import { useParams  } from 'react-router-dom';
import { useState, useEffect } from "react";
import {
  Box,
  Input,
  Text,
  FormControl,
  FormLabel,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  List,
  ListItem,
} from '@chakra-ui/react';
import axios from "axios";
import { Link } from "react-router-dom";


const Subevent: React.FC=()=>{

  const [event, setEvent] = useState({});
  const [subevents, setSubevent]=useState([]);

  const [formdata, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    time: ''
  });

  const {id} = useParams();
    useEffect(() => {
      // Fetch user data
      axios.get(`/api/event/geteventbyid/${id}`)
        .then((response) => {
          console.log(response.data.data);
          setEvent(response.data.data);
        })
        .catch((error) => {
          console.error(error);
          //navigate("/");
        });
    },[]);

    useEffect(() => {
      axios.get(`/api/subevent/getsubEventbyid/${id}`)
        .then((response) => {
          console.log(response.data.data);
          setSubevent(response.data.data);
        })
        .catch((error) => {
          console.error(error);
          //navigate("/");
        });
    },[])

    const handleInputChange = (field, value)=> {
     setFormData((prevData) =>({ ...prevData, [field]: value }));
    };
  

  const handleSubeventSubmit = (e) => {
    e.preventDefault();
    console.log(formdata);
    axios.post(`/api/subevent/addsubevent/${id}`, formdata,
    
  )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
    
  };

    return(
        <>
        <NavBar/>
        <Box bgGradient="linear(to-b, purple.400, pink.300)" w="100%" h="80%" position="absolute" zIndex="-1" />
        <VStack>
        <HStack width="100%" justifyContent="center" >
          <Heading>{event.event_name}</Heading>
          <Link to={`/general/${id}`}>
            <IconButton icon={<SettingsIcon />} aria-label='Search database' />
          </Link>

        </HStack>

      <Box p={4} maxWidth="200%" mx="auto">
      <form onSubmit={handleSubeventSubmit}>
        <Popover>
          <PopoverTrigger>
            <Center><Button colorScheme="purple" mt={4}>
              Add Subevent
            </Button></Center>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Add Subevent</PopoverHeader>
            <PopoverBody>
              {/* Subevent Form */}
              <FormControl mb={4}>
                <FormLabel htmlFor="subeventName">Name of Subevent</FormLabel>
                <Input
                  id="subeventName"
                  placeholder="Enter subevent name"
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor="subeventLocation">Location</FormLabel>
                <Input
                  id="subeventLocation"
                  placeholder="Enter subevent location"
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  required
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor="subeventDescription">Description</FormLabel>
                <Input
                  id="subeventDescription"
                  placeholder="Enter subevent description"
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor="subeventTime">Time</FormLabel>
                <Input
                  id="subeventTime"
                  placeholder="Enter subevent time"
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  required
                />
              </FormControl>
              <Button colorScheme="blue" type='submit'>
              Subevent
              </Button>
            </PopoverBody>
           
          </PopoverContent>
        </Popover>
        </form>

        {/* Section to display all subevents */}
        <Box mt={4} border={"1px"} borderColor="gray.200" padding="4" borderRadius="md" width={{ base: "100%", md:"800px"}} height={"400px"}>

          <Center>
        
          <Text fontSize="lg" fontWeight="bold">
              All Subevents
          </Text>
          </Center>
            <List>
              {Array.isArray(subevents) && subevents.map(subevent => (
                <ListItem  key={subevent.id}>
                  <Box><Text fontSize="md" fontWeight="bold">{subevent.event_name}</Text>
                  <h2>{subevent.location} - {subevent.event_description} - {subevent.start_date}</h2>
                  </Box>
                </ListItem>
              ))}
            </List>
          
        </Box>
    </Box>

</VStack>
        <NavBot/>
        </>
    )
}

export default Subevent;