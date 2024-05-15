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
import { useState } from "react";

const Guests:React.FC=()=>{
    const [owner, setOwner] = useState<any>([""]);
    const [cohost, setCohost]=useState<any>([""]);
    const [photographers, setphotographers]=useState<any>([""]);
    const [guest,setGuest]=useState<any>([""]);
    const [participants, setParticipants]=useState<any>([""]);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [roleType, setRoleType] = useState('');
  const [Name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your form submission logic here
    console.log('Form submitted with data:', { phoneNumber, roleType,Name });
  };


    return(
        <>
        <NavBar/>
        <Box bgGradient="linear(to-b, purple.400, pink.300)" w="100%" h="90%" position="absolute" zIndex="-1" />
        <Center>
        {/* Header */}
        <HStack width="100%" justifyContent="center" >
          <Heading>Getevent.Name</Heading>
          <IconButton icon={<SettingsIcon />} aria-label='Search database'  />
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
          <Text>{owner.length}</Text>
        </Box>
        <Box p={4} borderWidth="1px" borderRadius="lg" flex="1">
          <Text fontSize="lg" fontWeight="bold">No of Co-hosts</Text>
          <Text>{cohost.length}</Text>
        </Box>
        <Box p={4} borderWidth="1px" borderRadius="lg" flex="1">
          <Text fontSize="lg" fontWeight="bold">No of Photographers</Text>
          <Text>{photographers.length}</Text>
        </Box>
        <Box p={4} borderWidth="1px" borderRadius="lg" flex="1">
          <Text fontSize="lg" fontWeight="bold">No of Guests</Text>
          <Text>{guest.length}</Text>
        </Box>
      </Flex>


      {/* Participants list */}
      <Box p={4} borderWidth="1px" borderRadius="lg" height={"50vh"}>
        <Text fontSize="lg" fontWeight="bold">Participants</Text>
        <Stack spacing={2}>
          {participants.map((participant, index) => (
            <Text key={index}>{participant}</Text>
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
                    <Text mr={2}>+91</Text>
                    <Input
                    type="string"
                    id="Name"
                    placeholder="eg. Akash"
                    value={phoneNumber}
                    onChange={(e) => setName(e.target.value)}
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
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                    value={roleType}
                    onChange={(e) => setRoleType(e.target.value)}
                    required
                >
                    <option value="CO-HOST">CO-HOST</option>
                    <option value="GUEST">GUEST</option>
                    <option value="PHOTOGRAPHER">PHOTOGRAPHER</option>
                </Select>
                </FormControl>

                {/* Role Name Select for CO-HOST */}
                {roleType === 'CO-HOST' && (
                <FormControl mb={4}>
                    <FormLabel htmlFor="roleName">Select Role Name *</FormLabel>
                    <Select
                    id="roleName"
                    placeholder="Select role name"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    required
                    >
                    <option value="UploadPhotos">Upload photos to all the sub-events</option>
                    <option value="ConfigureSettings">Configure event settings</option>
                    <option value="AddUsers">Add users or subevents</option>
                    </Select>
                </FormControl>
                )}



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