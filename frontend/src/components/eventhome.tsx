import { useRef, useState } from "react";
import { VStack, Heading, IconButton, Box, Center, Text,Image } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import NavBar from "./NavBar";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBot from "./NavBot";

const Eventhome: React.FC = () => {
  const [event, setEvent] = useState({});
  
  const banner_url="./public/banner.jpg";

 
    try {
      //const response = axios.get("/api/event");
      console.log("Event created successfully:", response);
      // Reset form fields
      //setEvent(response.event);

    } catch (error) {
      // Handle error
      console.error("Error creating event:", error);
    }
    

  return (
    <>
      <NavBar />
      <Box bgGradient="linear(to-b, purple.400, pink.300)" w="100%" h="100vh" position="absolute" zIndex="-1" />
      <Center height="100vh">

          <VStack align="start" spacing="4" width={{ base: "auto", md: "600px" }} padding="4" borderRadius="md" bg="white" boxShadow="xl">
            {/* Header */}
            <Center width="100%">
              <Heading size="lg">
               eventName
              </Heading>
              <Link to="/general">
                <IconButton icon={<SettingsIcon />} aria-label="Search database" size="lg" />
              </Link>
              </Center>

            <Center width="100%">
            <Box  padding="4" borderRadius="md" bg="gray.100">
              <Image src={banner_url} />
            </Box>
            </Center>
    

            {/* Event Details */}
            <Box width="100%">
              <Text textStyle="bold" fontSize="xl">
                Event Details
              </Text>
              <Text>eventDescription</Text>
            </Box>
            

          </VStack>

      </Center>
      <NavBot />
    </>
  );
};

export default Eventhome;
