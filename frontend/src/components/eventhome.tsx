import { useRef, useState, useEffect } from "react";
import { VStack, Heading, IconButton, Box, Center, Text,Image } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import NavBar from "./NavBar";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import NavBot from "./NavBot";



const Eventhome: React.FC = () => {
  const [event, setEvent] = useState({});
  const { id } = useParams();
  localStorage.setItem("event_id", id);
  let banner_url="./public/banner.jpg";

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
  }, []);

  

  banner_url= event? event.banner_url : banner_url;
 

  return (
    <>
      <NavBar />
      <Box bgGradient="linear(to-b, purple.400, pink.300)" w="100%" h="100vh" position="absolute" zIndex="-1" />
      <Center height="100vh">

          <VStack align="start" spacing="4" width={{ base: "auto", md: "600px" }} padding="4" borderRadius="md" bg="white" boxShadow="xl">
            {/* Header */}
            <Center width="100%">
              <Heading size="lg">
               {event? event.event_name : "Event Name"}
              </Heading>
              <Link to={`/general/${id}`}>
            <IconButton icon={<SettingsIcon />} aria-label='Search database' />
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
              <Text>{event? event.event_description : "Event Details"}</Text>
            </Box>
            

          </VStack>

      </Center>
      <NavBot />
    </>
  );
};

export default Eventhome;
