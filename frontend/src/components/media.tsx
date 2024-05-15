import NavBar from "./NavBar";
import NavBot from "./NavBot";
import { Box, Divider, Button, Stack, HStack,VStack, Text, IconButton, Center,Heading ,Image, Input} from '@chakra-ui/react';
import { DownloadIcon } from "@chakra-ui/icons";
import { useState, useRef } from "react";
import { SettingsIcon } from "@chakra-ui/icons";


const Media: React.FC = () => {
    const photos = []; // Replace with your actual photo data
    const videos = []; // Replace with your actual video data

    const inputref=useRef(null);
    const [isPhotos, setIsPhotos] = useState(true);
    const [isVideos, setIsVideos] = useState(false);

    const handleFileChange = () => {
      if (inputref.current !== null) {
          inputref.current.click();
        }
    };
  
    const handleDownloadClick = () => {
      // Handle download logic
      console.log('Chal raha hu Bhai')
    };

    const handleFilterClick = (type) => {
        if (type === 'photos') {
          setIsPhotos(true);
          setIsVideos(false);
        } else if (type === 'videos') {
          setIsPhotos(false);
          setIsVideos(true);
        }
      };
  
    return (
     <>
    <NavBar/>
    <Box bgGradient="linear(to-b, purple.400, pink.300)" w="100%" h="90%" position="absolute" zIndex="-1" />
    <HStack width="100%" justifyContent="center" >
          <Heading>Getevent.Name</Heading>
          <IconButton icon={<SettingsIcon />} aria-label='Search database'  />
    </HStack>

    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Stack spacing={4}>
        <VStack direction="row" justify="space-between" align="center" >
        <HStack spacing={2} direction={{ base: "column", md: "row" }}>
            <Box className="text-3xl" border={"4px"} borderColor="gray.200" padding="4" borderRadius="md" width={{ base: "100%", md: "auto" }} maxWidth={{ base: "100%", md: "50vh" }}>
                <Text fontSize="xl">Photos: {photos.length}</Text>
            </Box>
            <Box className="text-3xl" border={"4px"} borderColor="gray.200" padding="4" borderRadius="md" width={{ base: "100%", md: "auto" }} maxWidth={{ base: "100%", md: "50vh" }}>
                <Text fontSize="xl">Videos: {videos.length}</Text>
            </Box>
        </HStack>

          <HStack>
          <IconButton icon={<DownloadIcon/>} aria-label="Download" colorScheme="blue" onClick={handleDownloadClick}/>
            <Text className="text-xl" color={"purple"}>DownloadALL</Text>
            </HStack>
        </VStack>
        <Divider />
        {/* Section to display photos and videos with filter */}
        {/* Replace with your own logic to render photos and videos */}
        {/* Photos and Videos Section */}
      <HStack width="100%" spacing="4">
        {/* Photos Section */}
        <Box width="100%" align="start" >
          <Heading size="md">Photos</Heading>
          <Box border={"4px"} borderColor="gray.200" padding="4" borderRadius="md" width={"100%"}>
            <Center onClick={handleFileChange}>
              <Image src='./public/upload_photos.png' />
              <Input type="file" placeholder="Add Photos" multiple ref={inputref} style={{ display: "none" }} />
            </Center>
          </Box>
        </Box>

        {/* Videos Section */}
        <Box width="100%" align="start" >
          <Heading size="md">Videos</Heading>
          <Box border={"4px"} borderColor="gray.200" padding="4" borderRadius="md" width={"100%"}>
            <Center onClick={handleFileChange}>
              <Image src='./public/upload_videos.png' />
              <Input type="file" placeholder="Add Videos" multiple ref={inputref} style={{ display: "none" }} />
            </Center>
          </Box>
        </Box>
      </HStack>
        <Stack spacing={4}>
          {/* Filter Section */}
          <Stack direction="row" spacing={4}>
            <Button
              colorScheme={isPhotos ? 'blue' : 'gray'}
              onClick={() => handleFilterClick('photos')}
            >
              Photos
            </Button>
            <Button
              colorScheme={isVideos ? 'blue' : 'gray'}
              onClick={() => handleFilterClick('videos')}
            >
              Videos
            </Button>
          </Stack>
          <Box border={"4px"} borderColor="gray.200" padding="4" borderRadius="md" height={"80vh"}>

            { (photos.length==0) && (videos.length==0 ) &&(
              <Center><Text className="text-3xl" color={"purple"}>No Media</Text></Center>
            )}
          { (isPhotos) && photos.map((photo) => (
            <img key={photo.id} src={photo.url} alt={`Photo ${photo.id}`} />
          ))}
          {/* Replace with your own logic to map and render videos */}
          { (isVideos) && videos.map((video) => (
            <video key={video.id} controls width="300">
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))}
          </Box>
        </Stack>

        
      </Stack>
    </Box>
    <NavBot/>
    </>
    );
};

export default Media;