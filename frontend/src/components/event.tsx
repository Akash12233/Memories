
import { VStack, HStack, Heading, IconButton, Input,Box, Center,Text,Image} from "@chakra-ui/react";
import { SettingsIcon , AddIcon} from "@chakra-ui/icons";
import NavBar from "./NavBar";
import { useRef } from "react";
import NavBot from "./NavBot";
import { Link } from "react-router-dom";

const Event:React.FC=()=>{

    const inputref=useRef(null);

    const handleFileChange = () => {
        if (inputref.current !== null) {
            inputref.current.click();
          }
      };

    return(
        <>
        <NavBar/>
        <Center>
      <VStack align="start" spacing="4" width={"100%"}>
        {/* Header */}
        <HStack width="100%" justifyContent="center" >
          <Heading>Getevent.Name</Heading>
        <Link to="/general">  <IconButton icon={<SettingsIcon />} aria-label='Search database'  /></Link>
        </HStack>

        {/* Banner Section */}
        <Box width="100%" marginBottom="4" border={"1px"} borderColor="gray.200" padding="4" borderRadius="md" >
          {/* Add your banner upload or selection component here */}
        <Center  onClick={handleFileChange}>
        <IconButton
                isRound={true}
                variant='solid'
                colorScheme='teal'
                aria-label='Done'
                fontSize='20px'
                icon={<AddIcon />}
                />
        <input  type='file' ref={inputref} style={{display:"none"}}  / >
      </Center>
      <Center>
      <Text textColor={'purple'} > Add Event Banner Image</Text>
      </Center>
        </Box>

        {/* Photos and Videos Section */}
        <HStack width="100%" spacing="4" >
          {/* Photos Section */}
          <VStack width="50%" align="start" ml={'20px'} >
            <Heading size="md">Photos</Heading>
            <Box border={"4px"} borderColor="gray.200" padding="4" borderRadius="md" width={"100vh"}>
            <Center onClick={handleFileChange}>
            <Image src='./public/upload_photos.png'/>
            <Input type="file" placeholder="Add Photos" multiple ref={inputref} style={{display:"none"}} />
            </Center>
            </Box>
            
          </VStack>

          {/* Videos Section */}
          <VStack width="50%" align="start" >
            <Heading size="md">Videos</Heading>
            <Box border={"4px"} borderColor="gray.200" padding="4" borderRadius="md" width={"100vh"}>
            <Center onClick={handleFileChange}>
            <Image src='./public/upload_videos.png'/>
            <Input type="file" placeholder="Add Videos" multiple ref={inputref} style={{display:"none"}} />
            </Center>
            </Box>
          </VStack>
        </HStack>

        {/* Another Two Sections Side by Side */}
        <Box m={"50px"}>
        <Text textStyle={"bold"} className="text-3xl"> Event Details</Text>
        <Text> GetEvent.Des</Text>
        </Box>
      </VStack>
      </Center>
      <NavBot/>
        </>
    );
};

export default Event