import React from 'react';
import { Link } from 'react-router-dom';
import { Center, Heading,SimpleGrid,Text, Image ,Box, Flex} from '@chakra-ui/react'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import Navbar from '../Navbar';
import Footer from '../Fotter';

const Firstpage: React.FC = () => {

  return (
    <>
    <Navbar/>
    <div className='text-5xl font-bold'>
      <Center bg='white'  color='Black'>
      New age event assistant & 
      </Center>
      <Center bg='white'  color='Black'>
      AI photo-sharing
      </Center>
    </div>
    <Center bg='white' height={100} color='Black'  className='text-3xl'>
    Supercharging events for Organisers, Guests, Photographers and Event professionals
    </Center>
    <Center height={100}>
    <Link to="/loginpage">  <button className="bg-white-500 hover:bg-purple-600 text-purple border border-purple-500 hover:border-purple-600 p-2 rounded-full shadow-2xl pl-10 pr-10">
              Get Started
      </button></Link>
    </Center>
    <Center bg='white' height={200} color='Black'  
      w='100%'
      h='200px'
      bgGradient='linear(to-r, pink.300, purple.300)'
    
    >
      <div> <span  className='text-5xl font-bold'>Elevate </span>  <span className='text-xl'>your event experience with   </span> <span className="text-3xl font-extrabold italic text-purple-300"> 
        Memories
      </span></div>
    </Center>
 

    <Center bg='white' height={200} color='Black'  className='text-3xl'>
    Make your events talk of the town
    </Center>
    
    <Center>
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
  <Card>
    <CardHeader>
      <Heading size='md' className='text-center'> Invite Guests</Heading>
    </CardHeader>
    <CardBody>
      <Text  className='text-center'>Invite guests, co-hosts and vendors to your event, and keep a complete track with sub-event level access control.</Text>
    </CardBody>
   <CardFooter  className='mx-10'>
      <Box  borderWidth='1px' borderRadius='lg' overflow='hidden'><Image src="./public/icon4.jpg"></Image></Box>
    </CardFooter>
  </Card>
  <Card>
    <CardHeader>
      <Heading size='md' className='text-center'> AI Photo Sharing</Heading>
    </CardHeader>
    <CardBody>
      <Text className='text-center'>AI photo-sharing with 99.98% accuracy on Facial recognition. Now, your friends will never complain about not getting photos..</Text>
    </CardBody>
    <CardFooter>
    <Box  borderWidth='1px' borderRadius='lg' overflow='hidden' className='mx-10'><Image src="./public/icon3.jpg"></Image></Box>
    </CardFooter>
  </Card>
  <Card>
    <CardHeader>
      <Heading size='md' className='text-center'> Event Itinerary</Heading>
    </CardHeader>
    <CardBody>
      <Text  className='text-center'>Create event itinerary and update everyone  on change in timing or venue with Google Calendar & Whatsapp integration.</Text>
    </CardBody>
    <CardFooter>
    < Box borderWidth='1px' borderRadius='lg' overflow='hidden' className='mx-10'><Image src="./public/icon2.jpg"></Image></Box>
    </CardFooter>
  </Card>
  <Card>
    <CardHeader>
      <Heading size='md' className='text-center'> Event Landing Page</Heading>
    </CardHeader>
    <CardBody>
      <Text  className='text-center'>Each event gets a beautiful landing page easily shareable through all social media platforms.</Text>
    </CardBody>
    <CardFooter>
    <Box borderWidth='1px' borderRadius='lg' overflow='hidden' className='mx-10'><Image src="./public/icon1.jpg"></Image></Box>
    </CardFooter>
  </Card>
</SimpleGrid>
</Center>

<Center height={100}>
      <button className="bg-white-500 hover:bg-purple-600 text-purple border border-purple-500 hover:border-purple-600 p-2 rounded-full shadow-2xl pl-10 pr-10">
              Get Started
      </button>
</Center>

<Flex color='white'>
  <Center w='750px'  h='500px'>
    <Box borderWidth='1px' borderRadius='lg' overflow='hidden' className='mx-20'><Image src='./public/m1.jpg' ></Image></Box>
  </Center>
  <Box w='750px'  h='300px' className='my-20'>
  <Card h='300px'>
    <CardHeader>
      <Heading size='md' className='text-center text-3xl' bg={'violet'} height={'40px'}> Instantly enjoy photos from the event</Heading>
    </CardHeader>
    <CardBody>
      <Text  className='text-center text-2xl'>
While official photos can take weeks to arrive, your Samaro gallery will be buzzing with photos even before your event ends as guests take and share photos instantly with Samaro Whatsapp Bot.</Text>
    </CardBody>
    <CardFooter>
    <Text className='text-center text-2xl' textColor={'thistle'}>So everyone can cherish photos without waiting for days. </Text>
    </CardFooter>
  </Card>
  </Box>  
</Flex>

<Center height={100}>
<Link to="/loginpage">  <button className="bg-white-500 hover:bg-purple-600 text-purple border border-purple-500 hover:border-purple-600 p-2 rounded-full shadow-2xl pl-10 pr-10">
              Get Started
      </button></Link>
</Center>

    <Footer/>

    </>
  );
};

export default Firstpage;
