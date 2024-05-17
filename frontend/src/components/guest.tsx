import { Center, Heading, IconButton, HStack ,Box, VStack,Text,Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    Stack,Flex, Button} from "@chakra-ui/react";
    import {
        Input,
        Select,
        FormControl,
        FormLabel,
        RadioGroup,
        Radio,
      } from '@chakra-ui/react';
import { SettingsIcon } from "@chakra-ui/icons";
import NavBar from "./NavBar";
import NavBot from "./NavBot";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Guests:React.FC=()=>{
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    roleType: '',
  })
  const {id} = useParams();
  const [guest, setGuest] = useState([]);
  const [event, setEvent] = useState({});
  const owner= 1;
  const [cohost,setCohost]=useState([]);
  const [photographer,setPhotographer]=useState([]);
  const [justguest, setJustguest] = useState([]);

  useEffect(() => {
    // Fetch user data
    axios.get(`/api/event/geteventbyid/${id}`)
      .then((response) => {
        console.log(response.data.data);
        setEvent(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  },[]);

  useEffect(() => {
    axios.get(`/api/guest/getguest/${id}`)
      .then((response) => {
        console.log(response.data.data);
        setGuest(response.data.data.guest);
        setCohost(response.data.data.cohost);
        setPhotographer(response.data.data.photographer);
        setJustguest(response.data.data.justguest);
      })
      .catch((error) => {
        console.error(error);
      });
  },[])

  

  

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios.post(`/api/guest/addguest/${id}`, {
      name: formData.name,
      mobile: formData.phoneNumber,
      role: formData.roleType,
    })
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
        <Box bgGradient="linear(to-b, purple.400, pink.300)" w="100%" h="90%" position="absolute" zIndex="-1" />
        <Center>
        {/* Header */}
        <HStack width="100%" justifyContent="center" >
          <Heading>{event?.event_name}</Heading>
          <Link to={`/general/${id}`}>
            <IconButton icon={<SettingsIcon />} aria-label='Search database' />
          </Link>

        </HStack>
        </Center>
        <Box width="100%" marginBottom="4" border={"1px"} borderColor="gray.200" padding="4" borderRadius="md">
        <VStack>
        <Text className="text-3xl" color={"purple"}>Guests list</Text>
        <HStack>
      {/* Owner, Co-hosts, Photographers, and Guests boxes */}
      <Box p={4} borderWidth="1px" borderRadius="lg" width={"100%"}>
      <Flex>
        <Box p={4} borderWidth="1px" borderRadius="lg" flex="1" >
          <Text fontSize="lg" fontWeight="bold">Owner of Event</Text>
          <Text>{owner}</Text>
        </Box>
        <Box p={4} borderWidth="1px" borderRadius="lg" flex="1">
          <Text fontSize="lg" fontWeight="bold">No of Co-hosts</Text>
          <Text>{cohost}</Text>
        </Box>
        <Box p={4} borderWidth="1px" borderRadius="lg" flex="1">
          <Text fontSize="lg" fontWeight="bold">No of Photographers</Text>
          <Text>{photographer}</Text>
        </Box>
        <Box p={4} borderWidth="1px" borderRadius="lg" flex="1">
          <Text fontSize="lg" fontWeight="bold">No of Guests</Text>
          <Text>{justguest}</Text>
        </Box>
      </Flex>


      {/* Participants list */}
      <Box p={4} borderWidth="1px" borderRadius="lg" height={"50vh"}>
        <Text fontSize="lg" fontWeight="bold">Participants</Text>
        <Stack spacing={2}>
          {guest &&  guest.map((participant) => (
            <Text key={participant.id}> {participant.guest_name}</Text>
          ))}
        </Stack>
      </Box>

      {/* Event Button with Popover */}
      <Popover>
        <PopoverTrigger>
        <Center  m={'10px'}>  <Button colorScheme="blue">Add Guest</Button></Center>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Guest Details</PopoverHeader>
          <PopoverBody>
          <Box p={4} maxWidth="400px" mx="auto">
            <form onSubmit={handleSubmit}>
                {/* Event Name Input */}
                <FormControl mb={4}>
                <FormLabel htmlFor="name">Name *</FormLabel>
                <Box display="flex">
                    <Input
                    type="string"
                    id="Name"
                    placeholder="eg. Akash"
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    />
                </Box>
                </FormControl>
                {/* Phone Number Input */}
                <FormControl mb={4}>
                <FormLabel htmlFor="phoneNumber">Phone Number *</FormLabel>
                <Box display="flex">
                    <Text mr={2}>+91</Text>
                    <Input
                    type="tel"
                    id="phoneNumber"
                    placeholder="Enter 10 digit number"
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    required
                    pattern="[0-9]{10}"
                    />
                </Box>
                </FormControl>

                {/* Role Type Select */}
                <FormControl mb={4}>
                <FormLabel htmlFor="roleType">Select Role Type *</FormLabel>
                <Select
                    id="roleType"
                    placeholder="Select role type"
                    onChange={(e) => handleInputChange('roleType', e.target.value)}
                    required
                >
                    <option value="CO-HOST">CO-HOST</option>
                    <option value="GUEST">GUEST</option>
                    <option value="PHOTOGRAPHER">PHOTOGRAPHER</option>
                </Select>
                </FormControl>
          
                {/* Submit Button */}
                <Button type="submit" colorScheme="blue" mt={4}>
                Submit
                </Button>
            </form>
    </Box>
    </PopoverBody>
  </PopoverContent>
  </Popover>
  </Box>
  </HStack>
  </VStack>
  </Box>
  <NavBot/>
  </>
    );
};

export default Guests;