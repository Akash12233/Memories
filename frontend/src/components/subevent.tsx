import { VStack ,HStack,Heading,IconButton,Center} from "@chakra-ui/react";
import NavBar from "./NavBar"
import NavBot from "./NavBot"
import { SettingsIcon } from "@chakra-ui/icons";
import React, { useState } from 'react';
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



const Subevent: React.FC=()=>{

const [phoneNumber, setPhoneNumber] = useState('');
  const [roleType, setRoleType] = useState('');
  const [roleName, setRoleName] = useState('');
  const [subevents, setSubevents] = useState([]);
  const [newSubevent, setNewSubevent] = useState({
    name: '',
    location: '',
    description: '',
    time: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your form submission logic here
    console.log('Form submitted with data:', { phoneNumber, roleType, roleName });
  };

  const handleSubeventSubmit = () => {
    setSubevents([subevents, newSubevent]);
    setNewSubevent({
      name: '',
      location: '',
      description: '',
      time: '',
    });
  };

    return(
        <>
        <NavBar/>
        <VStack>
        <HStack width="100%" justifyContent="center" >
          <Heading>Getevent.Name</Heading>
          <IconButton icon={<SettingsIcon />} aria-label='Search database'  />
        </HStack>

        <Box p={4} maxWidth="600px" mx="auto">
      <form onSubmit={handleSubmit}>
        {/* ... (Previous form content) ... */}

        {/* Add Subevent Button with Popover Form */}
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
                  value={newSubevent.name}
                  onChange={(e) => setNewSubevent({ ...newSubevent, name: e.target.value })}
                  required
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor="subeventLocation">Location</FormLabel>
                <Input
                  id="subeventLocation"
                  placeholder="Enter subevent location"
                  value={newSubevent.location}
                  onChange={(e) => setNewSubevent({ ...newSubevent, location: e.target.value })}
                  required
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor="subeventDescription">Description</FormLabel>
                <Input
                  id="subeventDescription"
                  placeholder="Enter subevent description"
                  value={newSubevent.description}
                  onChange={(e) => setNewSubevent({ ...newSubevent, description: e.target.value })}
                  required
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor="subeventTime">Time</FormLabel>
                <Input
                  id="subeventTime"
                  placeholder="Enter subevent time"
                  value={newSubevent.time}
                  onChange={(e) => setNewSubevent({ ...newSubevent, time: e.target.value })}
                  required
                />
              </FormControl>
              <Button type="button" colorScheme="blue" onClick={handleSubeventSubmit}>
                Add Subevent
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        {/* Section to display all subevents */}
        <Box mt={4} border={"1px"} borderColor="gray.200" padding="4" borderRadius="md" width={"100vh"} height={"50vh"}>
        <Text fontSize="lg" fontWeight="bold">
            All Subevents
          </Text>
          <List>
            {subevents.map((subevent, index) => (
              <ListItem key={index}>
                {subevent.name} - {subevent.location} - {subevent.description} - {subevent.time}
              </ListItem>
            ))}
          </List>
        </Box>
      </form>
    </Box>

        </VStack>
        <NavBot/>
        </>
    )
}

export default Subevent;