import { Center, Heading, IconButton, HStack ,Box, VStack,Text,Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    SimpleGrid,Flex, Button} from "@chakra-ui/react";
    import {
        Input,
        Select,
        FormControl,
        FormLabel,
      } from '@chakra-ui/react';
import { SettingsIcon } from "@chakra-ui/icons";
import { useEffect, useState , useRef} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import * as XLSX from 'xlsx';
import { AddIcon } from "@chakra-ui/icons";
import PopupAlert from "../components/message";

const Guests: React.FC=()=>{
  const navigate =useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    roleType: '',
  })
  const settings =localStorage.getItem("settings") ? JSON.parse(localStorage.getItem("settings")) : null;
  const inputref = useRef<HTMLInputElement | null>(null);
  const {id1, id2} = useParams();
  const [guest, setGuest] = useState([]);
  const [event, setEvent] = useState({});
  const owner= 1;
  const [cohost,setCohost]=useState([]);
  const [photographer,setPhotographer]=useState([]);
  const [justguest, setJustguest] = useState([]);
  const [error, setError] = useState("");


  useEffect(() => {
    // Fetch user data
    axios.get(`/api/event/geteventbyid/${id1}`)
      .then((response) => {
        console.log(response.data.data);
        setEvent(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  },[]);

  useEffect(() => {
    axios.get(`/api/guest/getguest/${id1}`)
      .then((response) => {
        setGuest(response.data.data.guest);
        setCohost(response.data.data.cohost);
        setPhotographer(response.data.data.photographer);
        setJustguest(response.data.data.justguest);
      })
      .catch((error) => {
        console.error(error);
      });
  })

  const handleFileChange = () => {
    if (inputref.current !== null) {
      inputref.current.click();
    }
  };

  

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };



  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        // Handle the uploaded file here
        axios.post(`/api/guest/addguestArray/${id1}`, {
          jsonData
        })
          .then((response) => {
            console.log(response.data);
            setError("Guest Added");
          })
          .catch((error) => {
            console.error(error);
            setError("Error Adding guest");
          });
      };
      reader.readAsArrayBuffer(file);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios.post(`/api/guest/addguest/${id1}`, {
      name: formData.name,
      mobile: formData.phoneNumber,
      role: formData.roleType,
    })
      .then((response) => {
        console.log(response.data);
        setError("Guest Added");
      })
      .catch((error) => {
        console.error(error);
        setError("Error Adding guest");
      });

  };

  if(id2 != event?.user_id){
    if(id2 != event?.cohostid){
      navigate("/");
    }
  }


  return (
    <>
      <Box bgGradient="linear(to-b, purple.400, pink.300)" w="100%" h="90%" position="absolute" zIndex="-1" />
      {error && <PopupAlert message={error} />}
      <Center>
        {/* Header */}
        
        <HStack width="100%" justifyContent="center" flexDirection={{ base: "column", md: "row" }} p={4}>
          <Heading size="lg" textAlign="center">{event?.event_name}</Heading>
          {settings &&
            <Link to={`/general/${id1}`}>
              <IconButton icon={<SettingsIcon />} aria-label='Settings' />
            </Link>}
        </HStack>
      </Center>
      <Box width="100%" marginBottom="4"  padding="4" >
        <VStack spacing={4}>
          <Text fontSize="2xl" color="purple.600">Guests List</Text>
          <Box p={4} borderWidth="1px" borderRadius="lg" width="100%">
            <Flex flexDirection={{ base: "column", md: "row" }} justifyContent="space-between">
              <Box p={4} borderWidth="1px" borderRadius="lg" flex="1" mb={{ base: 4, md: 0 }}>
                <Text fontSize="lg" fontWeight="bold">Owner of Event</Text>
                <Text>{owner}</Text>
              </Box>
              <Box p={4} borderWidth="1px" borderRadius="lg" flex="1" mb={{ base: 4, md: 0 }}>
                <Text fontSize="lg" fontWeight="bold">No of Co-hosts</Text>
                <Text>{cohost}</Text>
              </Box>
              <Box p={4} borderWidth="1px" borderRadius="lg" flex="1" mb={{ base: 4, md: 0 }}>
                <Text fontSize="lg" fontWeight="bold">No of Photographers</Text>
                <Text>{photographer}</Text>
              </Box>
              <Box p={4} borderWidth="1px" borderRadius="lg" flex="1">
                <Text fontSize="lg" fontWeight="bold">No of Guests</Text>
                <Text>{justguest}</Text>
              </Box>
            </Flex>

            {/* Participants list */}
            <Box p={4}  height={"50vh"} overflowY="auto" mt={4}>
              <Text fontSize="lg" fontWeight="bold">Participants</Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {guest && guest.map((participant, index) => (
                  <Box key={participant.id} p={2} >
                    <Text>{index + 1}. {participant.guest_name}</Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>

            {/* Event Button with Popover */}
            <Popover>
              <PopoverTrigger>
                <Center m={'10px'}> <Button colorScheme="blue">Add Guest</Button></Center>
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
                        <Input
                          type="text"
                          id="Name"
                          placeholder="eg. Akash"
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                        />
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
                          <option value="cohost">CO-HOST</option>
                          <option value="guest">GUEST</option>
                          <option value="photographer">PHOTOGRAPHER</option>
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
            <div>
              <Center onClick={handleFileChange}>
                <IconButton
                  isRound
                  variant="solid"
                  colorScheme="teal"
                  aria-label="Upload"
                  fontSize="20px"
                  icon={<AddIcon />}
                />
                <input
                  type="file"
                  ref={inputref}
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />
              </Center>
            </div>
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export default Guests;