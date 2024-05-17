import { useRef, useState} from "react";
import { VStack, Heading, IconButton, Input, Box, Center, Text, Button, Textarea } from "@chakra-ui/react";
import { SettingsIcon, AddIcon } from "@chakra-ui/icons";
import NavBar from "./NavBar";
import axios from "axios";
import { Link } from "react-router-dom";

const Event: React.FC = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    eventDescription: "",
    bannerImage: null,
  })

  const inputref = useRef<HTMLInputElement>(null);
  

  const handleInputChange = ( field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleFileChange = () => {
    if (inputref.current !== null) {
      inputref.current.click();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(formData);
    try {

        axios.post("/api/event/addevent", {
          event_name: formData.eventName, 
          event_description :formData.eventDescription, 
          banner: formData.bannerImage
        },
        {
          headers: {
              'Content-Type': 'multipart/form-data',
          }
      })
        .then((response) => {
          console.log(response.data);
        })
        
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      // Handle error
      console.error("Error creating event:", error);
    }
  };
  
  return (
    <>
      <NavBar />
      <Box bgGradient="linear(to-b, purple.400, pink.300)" w="100%" h="100vh" position="absolute" zIndex="-1" />
      <Center height="100vh">
        <form onSubmit={handleSubmit}>
          <VStack align="start" spacing="4" width={{ base: "auto", md: "600px" }} padding="4" borderRadius="md" bg="white" boxShadow="xl">
            {/* Header */}
            <Center width="100%">
              <Heading size="lg">
                <Input placeholder="Event Name" onChange={(e) => handleInputChange('eventName' ,e.target.value)} />
              </Heading>
              <Link to="/general">
                <IconButton icon={<SettingsIcon />} aria-label="Search database" size="lg" />
              </Link>
            </Center>

            {/* Banner Section */}
            <Box width="100%" padding="4" borderRadius="md" bg="gray.100">
              <Center onClick={handleFileChange}>
                <IconButton isRound variant="solid" colorScheme="teal" aria-label="Done" fontSize="20px" icon={<AddIcon />} />
                <input type="file" ref={inputref} style={{ display: "none" }} onChange={(e) => handleInputChange('bannerImage',  e.target.files?.[0])} accept="image/*" />
              </Center>
              <Center>
                <Text textColor="purple">Add Event Banner Image</Text>
              </Center>
            </Box>

            {/* Event Details */}
            <Box width="100%">
              <Text textStyle="bold" fontSize="xl">
                Event Details
              </Text>
              <Textarea placeholder="Event Description"  onChange={(e) => handleInputChange( 'eventDescription', e.target.value)} />
            </Box>

            {/* Submit Button */}
            <Center width="100%">
              <Button type="submit" colorScheme="purple">
                Submit
              </Button>
            </Center>
          </VStack>
        </form>
      </Center>
    </>
  );
};

export default Event;
