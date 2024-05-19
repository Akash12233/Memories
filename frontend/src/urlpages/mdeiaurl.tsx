import { Box, Divider, Button, Stack, HStack,VStack, Text, IconButton, Center,Heading ,Image, Input, Flex} from '@chakra-ui/react';
import { DownloadIcon } from "@chakra-ui/icons";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {saveAs} from "file-saver";

const  Urlmediapage = () => {
    
    const [event, setEvent] = useState({});
    const [photos, setPhotos] = useState<any>([]);
    const [videos, setVideos] = useState<any>([]);
    const [formdata, setFormData] = useState({
      images:null,
      videos:null
    });
    const imageref=useRef(null);
    const videoref=useRef(null);
    const [isPhotos, setIsPhotos] = useState(true);
    const [isVideos, setIsVideos] = useState(false);

    const {id} = useParams();
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

    useEffect(() => {
      axios.get(`/api/media/getimage/${id}`)
      .then((response) => {
        setPhotos(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
    }, []);

    useEffect(() => {
      axios.get(`/api/media/getvideo/${id}`)
      .then((response) => {
        setVideos(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
    }, []);

    const handleInputChange = (field, files)=> {
    
      const fileList = Array.from(files);
      console.log(fileList, field);
     setFormData((prevData) =>({ ...prevData, [field]: fileList }));
    };

    const handleImageChange = () => {
      if (imageref.current !== null) {
          imageref.current.click();
        }
    };

    const handleVideoChange = () => {
      if (videoref.current !== null) {
          videoref.current.click();
        }
    };
  
    const handleDownloadClick = () => {
      photos.map( photo=>{
        saveAs("file", photo.imageurl);
      })

      videos.map(video=>{
        saveAs("file", video.videourl);
      })
  

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
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if(formdata.images){
          axios.post(`/api/media/addimage/${id}`, formdata.images
          ,{
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
      }

      if(formdata.videos){
        axios.post(`/api/media/addvideo/${id}`, formdata.videos,{
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
      }


      };
  
    return (
     <>
    <Box bgGradient="linear(to-b, purple.400, pink.300)" w="100%" h="100%" position="absolute" zIndex="-1" />
    <HStack width="100%" justifyContent="center" >
          <Heading>{event?.event_name }</Heading>
    </HStack>

    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Stack spacing={4}>
        <VStack direction="row" justify="space-between" align="center" >
        <HStack spacing={2} direction={{ base: "column", md: "row" }}>
            <Box className="text-3xl" border={"4px"} borderColor="gray.200" padding="4" borderRadius="md" width={{ base: "100%", md: "auto" }} maxWidth={{ base: "100%", md: "50vh" }}>
                <Text fontSize="xl">Photos: {photos.length}</Text>
            </Box>
            <Divider orientation="vertical" />
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
      <form onSubmit={handleSubmit}>
      <HStack width="100%" spacing="4">
        {/* Photos Section */}
        <Box width="100%" align="start" >
          <Heading size="md">Photos</Heading>
          <Box border={"4px"} borderColor="gray.200" padding="4" borderRadius="md" width={"100%"}>
            <Center onClick={handleImageChange}>
              <Image src='/upload_photos.png' />
              <Input type="file" placeholder="Add Photos" multiple ref={imageref} style={{ display: "none" }} onChange={(e) => handleInputChange('images', e.target.files)} />
            </Center>
          </Box>
        </Box>
        <Divider orientation="vertical" />
        {/* Videos Section */}
        <Box width="100%" align="start" >
          <Heading size="md">Videos</Heading>
          <Box border={"4px"} borderColor="gray.200" padding="4" borderRadius="md" width={"100%"}>
            <Center onClick={handleVideoChange}>
              <Image src='/upload_videos.png' />
              <Input type="file" placeholder="Add Videos" multiple ref={videoref} style={{ display: "none" }} onChange={(e) => handleInputChange('videos', e.target.files)}  />
            </Center>
          </Box>
        </Box>
      </HStack>
      <Center>
      <Button type="submit" colorScheme="blue" m={2}>Upload</Button>
      </Center>
      </form>
      <Divider />
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
          <Box border={"4px"} borderColor="gray.200" padding="4" borderRadius="md" height={"auto"} >

        { (photos.length==0) && (videos.length==0 ) &&(
          <Center><Text className="text-3xl" color={"purple"}>No Media</Text></Center>
        )}

        <Flex
        flexWrap="wrap"
        justifyContent="center"
        gap={4}
        overflowY="auto" // or "scroll" depending on your preference
        maxHeight="300px" // Adjust the height according to your needs
        >
        {isPhotos &&
          Array.isArray(photos) &&
          photos.length > 0 &&
          photos.map((photo) => (
            <Box key={photo.id} width="100px" marginBottom="2px" border="4px" borderRadius="md">
              <a href={photo.imageurl} target="_blank" rel="noopener noreferrer">
                <Image src={photo.imageurl} alt={`Photo ${photo.id}`} width="100%" />
              </a>
            </Box>
          ))}
        </Flex>


        <Flex flexWrap="wrap" justifyContent="center" gap={4} overflowY="auto">
        { (isVideos) && Array.isArray(videos) &&videos.length > 0 && videos.map((video) => (
        <video key={video.id} controls width="300">
          <source src={video.videourl} type="video/mp4" />
          Your browser does not support the video tag. 
        </video>
        ))}
        </Flex>
        </Box>
        </Stack>

        
      </Stack>
    </Box>
    </>
    );
};

export default Urlmediapage;