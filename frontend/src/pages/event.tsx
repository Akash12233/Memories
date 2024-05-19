import { useEffect, useRef, useState} from "react";
import { VStack, Heading, IconButton, Input, Box, Center, Text, Button, Textarea , FormControl, FormLabel, FormErrorMessage,Select} from "@chakra-ui/react";
import { SettingsIcon, AddIcon } from "@chakra-ui/icons";
import NavBar from "../components/NavBar";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PopupAlert from "../components/message";

const Event: React.FC = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    eventDescription: "",
    eventType : "",
    bannerImage: null,
    startDate: null,
    endDate: null,
  })

  const navigate =useNavigate();
  const [error, setError] = useState("");
  const inputref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    
    console.log(localStorage.getItem("user"));
    if(localStorage.getItem("user") == null){
      navigate('/');
    }
  })

  
  

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
          event_type: formData.eventType,
          start_date: formData.startDate,
          end_date: formData.endDate,
          banner: formData.bannerImage
        },
        {
          headers: {
              'Content-Type': 'multipart/form-data',
          }
      })
        .then((response) => {
          console.log(response.data);
          setError("Event created successfully");
          navigate('/homepage');
        })
        
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      // Handle error
      console.error("Error creating event:", error);
      if(error.message === 'Request failed with status code 401'){
        navigate('/');
      }
      setError("Failed to create event");
    }
  };
  
  return (
    <>
      <NavBar {...{profile: true, memories: true}}/>
      <Box bgGradient="linear(to-b, purple.400, pink.300)" w="100%" h="100vh" position="absolute" zIndex="-1" />
      <Center height="100vh">
        <form onSubmit={handleSubmit}>
          <VStack align="start" spacing="4" width={{ base: "auto", md: "600px" }} padding="4" borderRadius="md" bg="white" boxShadow="xl">
            {/* Header */}
            {error&& <PopupAlert message={error} />}
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


            <FormControl isRequired>
            <FormLabel>Event type</FormLabel>
            <Select placeholder="Select event type" onChange={(e) => handleInputChange('eventType', e.target.value)}>
            <optgroup label='Frequently used'>
              <option value="Concert" > Concert</option>
              <option value="Corporate Meeting">Corporate</option>
              <option value="Wedding" >Wedding</option>
              <option value="Engagement" >Engagement</option>
            </optgroup>

            <optgroup label='College & School Event'>
              <option value="Annual Festival"  >Annual Festival</option>
              <option value="Cutural Festival" >Cutural Festival</option>
              <option value="Sport Festival" >Sport Festival</option>
              <option value="Tech Festival" >Tech Festival</option>
              <option value="Convocation" >Convocation</option>
              <option value="Dance Festival">Dance Event</option>
            </optgroup>

            <optgroup label='Corporate'>
              <option value="Conference">Conference</option>
              <option value="Founderday">Founder's Day</option>
              <option value="Annual Celebration">Annual Celebration</option>
            </optgroup>

            <optgroup label='Other'>
              <option value="Award Ceremony">Award Show</option>
              <option value="Exhibition">Exibhition</option>
              <option value="Music">Music Concert</option>
              <option value="Fundraiser">Fundraiser</option>
              <option value="other">Other</option>
            </optgroup>
            </Select>
            <FormErrorMessage>* Required</FormErrorMessage>
          </FormControl>

            {/* Event Details */}
            <Box width="100%">
              <Text textStyle="bold" fontSize="xl">
                Event Details
              </Text>
              <Textarea placeholder="Event Description"  onChange={(e) => handleInputChange( 'eventDescription', e.target.value)} />
            </Box>

            <Box width="100%">
              <Text textStyle="bold" fontSize="xl">
                Start Date
              </Text>
              <Input placeholder="Event Description"  type="date" onChange={(e) => handleInputChange( 'startDate', e.target.value)} />
            </Box>
            
            <Box width="100%">
              <Text textStyle="bold" fontSize="xl">
                End Date
              </Text>
              <Input placeholder="Event Description"  type="date" onChange={(e) => handleInputChange( 'endDate', e.target.value)} />
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
