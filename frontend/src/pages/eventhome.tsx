import { useState, useEffect, useRef } from "react";
import { VStack, Heading, IconButton, Box, Center, Text,Image, Button, Textarea, Input } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PopupAlert from "../components/message";



const Eventhome: React.FC = () => {

  const [formData, setFormData] = useState({
    eventName: "",
    eventDescription: "",
    eventType : "",
    bannerImage: null,
    startDate: null,
    endDate: null,
  })

  const [error, setError] = useState('');
  const inputref = useRef<HTMLInputElement>(null);

  const handleFileChange = () => {
    if (inputref.current !== null) {
      inputref.current.click();
    }
  };




  const [event, setEvent] = useState({});
  const { id1, id2 } = useParams();
  localStorage.setItem("event_id", id1);
  localStorage.setItem("user_id", id2);
  let banner_url="./public/banner.jpg";
  const settings =localStorage.getItem("settings") ? JSON.parse(localStorage.getItem("settings")) : null;
  const navigate = useNavigate();

  const handleInputChange = ( field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  useEffect(() => {
    // Fetch user data
    axios.get(`/api/event/geteventbyid/${id1}`)
      .then((response) => {

        setEvent(response.data.data);
        setFormData({
          eventName: response.data.data.event_name,
          eventDescription: response.data.data.event_description,
          eventType: response.data.data.event_type,
          bannerImage: null,
          startDate: response.data.data.start_date,
          endDate: response.data.data.end_date,
        });
      })
      .catch((error) => {
        console.error(error);
        setError("Error fetching user Event");
      });
  }, []);


  if(id2 != event?.user_id){
    if(id2 != event?.cohostid){
      navigate("/");
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios.post(`/api/event/updateevent/${id1}`, {
      event_name: formData.eventName, 
      event_description :formData.eventDescription, 
      event_type: formData.eventType,
      start_date: formData.startDate,
      end_date: formData.endDate,
    })
    .then((response) => {
      setError("Event updated successfully");
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
      setError("Error Updating event");
      if(error.message == "Request failed with status code 401"){
        navigate('/');
      }
    });
    
  };
  

  banner_url= event? event.banner_url : banner_url;
 

  return (
    <>
      <Box bgGradient="linear(to-b, purple.400, pink.300)" w="100%" h="100vh" position="absolute" zIndex="-1" />
      <Center height="100vh">
          <form onSubmit={handleSubmit}>
          <VStack align="start" spacing="4" width={{ base: "300px", md: "600px" }} padding="4" borderRadius="md" bg="white" boxShadow="xl">
            {error && <PopupAlert message={error} />}
            {/* Header */}
            <Center width="100%">
              <Heading size="lg" >
              <Input type="text"  placeholder={event? event.event_name : "Event Name"} onChange={(e) => handleInputChange('eventName', e.target.value)} /> 
              </Heading>
              {settings &&
              <Link to={`/general/${id1}`}>
                  <IconButton icon={<SettingsIcon />} aria-label='Search database' />
              </Link>}
          </Center>

            <Center width="100%"  onClick={handleFileChange}>
            <Box  padding="4" borderRadius="md" bg="gray.100">
              <Image src={banner_url} />
              <Input type="file" ref={inputref} style={{ display: "none" }} onChange={(e) => handleInputChange('bannerImage',  e.target.files?.[0])} accept="image/*" />

            </Box>
            </Center>
    

            {/* Event Details */}
            <Box width="100%">
              <Text textStyle="bold" fontSize="xl">
                Event Details
              </Text>
              <Textarea  placeholder={event? event.event_description : "Event Details"} onChange={(e) => handleInputChange('eventDescription', e.target.value)}/>
            </Box>

            
            <Box width="100%">
              <Text textStyle="bold" fontSize="xl">
                Start Date
              </Text>
              <input placeholder={event? event.start_date : "Start Date"}  type="date" onChange={(e) => handleInputChange( 'startDate', e.target.value)} />
            </Box>
            
            <Box width="100%">
              <Text textStyle="bold" fontSize="xl">
                End Date
              </Text>
              <input placeholder={event? event.end_date : "End Date"} type="date" onChange={(e) => handleInputChange( 'endDate', e.target.value)} />
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

export default Eventhome;
