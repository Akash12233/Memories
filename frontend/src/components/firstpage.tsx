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
    
    <Center bg='white' color='black' textAlign="center" p={4} fontSize={{ base: '3xl', md: '5xl' }} fontWeight="bold">
                New age event assistant & <br /> AI photo-sharing
            </Center>

            <Center bg='white' color='black' height={100} fontSize={{ base: '2xl', md: '3xl' }} p={4}>
                Supercharging events for Organisers, Guests, Photographers and Event professionals
            </Center>

            <Center>
                <Link to="/loginpage">
                    <button className="bg-white-500 hover:bg-purple-600 text-purple border border-purple-500 hover:border-purple-600 p-2 rounded-full shadow-2xl px-10">
                        Get Started
                    </button>
                </Link>
            </Center>

            <Center bg='white' height={200} color='black' w='100%' bgGradient='linear(to-r, pink.300, purple.300)' p={4}>
                <div>
                    <span className='text-5xl font-bold'>Elevate </span>
                    <span className='text-xl'>your event experience with </span>
                    <span className="text-3xl font-extrabold italic text-purple-300">
                        Memories
                    </span>
                </div>
            </Center>

            <Center bg='white' height={200} color='black' fontSize={{ base: '2xl', md: '3xl' }} p={4}>
                Make your events talk of the town
            </Center>

            <Center>
                <SimpleGrid spacing={4} templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                    <Card>
                        <CardHeader>
                            <Heading size='md' className='text-center'> Invite Guests</Heading>
                        </CardHeader>
                        <CardBody>
                            <Text className='text-center'>Invite guests, co-hosts and vendors to your event, and keep a complete track with sub-event level access control.</Text>
                        </CardBody>
                        <CardFooter display="flex" justifyContent="center">
                            <Box borderWidth='1px' borderRadius='lg' overflow='hidden' ><Image src="./public/icon4.jpg"></Image></Box>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Heading size='md' className='text-center'> AI Photo Sharing</Heading>
                        </CardHeader>
                        <CardBody>
                            <Text className='text-center'>AI photo-sharing with 99.98% accuracy on Facial recognition. Now, your friends will never complain about not getting photos..</Text>
                        </CardBody>
                        <CardFooter display="flex" justifyContent="center">
                            <Box borderWidth='1px' borderRadius='lg' overflow='hidden' ><Image src="./public/icon3.jpg"></Image></Box>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Heading size='md' className='text-center'> Event Itinerary</Heading>
                        </CardHeader>
                        <CardBody>
                            <Text className='text-center'>Create event itinerary and update everyone on change in timing or venue with Google Calendar & Whatsapp integration.</Text>
                        </CardBody>
                        <CardFooter display="flex" justifyContent="center">
                            <Box borderWidth='1px' borderRadius='lg' overflow='hidden' ><Image src="./public/icon2.jpg"></Image></Box>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Heading size='md' className='text-center'> Event Landing Page</Heading>
                        </CardHeader>
                        <CardBody>
                            <Text className='text-center'>Each event gets a beautiful landing page easily shareable through all social media platforms.</Text>
                        </CardBody>
                        <CardFooter display="flex" justifyContent="center">
                            <Box borderWidth='1px' borderRadius='lg' overflow='hidden' ><Image src="./public/icon1.jpg"></Image></Box>
                        </CardFooter>
                    </Card>
                </SimpleGrid>
            </Center>

            <Center>
                <Link to="/loginpage">
                    <button className="bg-white-500 hover:bg-purple-600 text-purple border border-purple-500 hover:border-purple-600 p-2 m-10 rounded-full shadow-2xl px-10">
                        Get Started
                    </button>
                </Link>
            </Center>
            <Card
                direction={{ base: 'column', lg: 'row' }}
                overflow='hidden'
                variant='outline'
                    >

                <Center w={{ base: '100%', md: '50%' }} h={{ base: 'auto', md: '300px' }}>
                    <Image src='./public/m1.jpg' ></Image>
                </Center>
                <Box w={{ base: '100%', md: '50%' }} h={{ base: 'auto', md: '300px' }} >
                    <Card >
                        <CardHeader>
                            <Heading size='md' className='text-center text-3xl' bg={'violet'} height={'40px'}> Instantly enjoy photos from the event</Heading>
                        </CardHeader>
                        <CardBody>
                            <Text className='text-center text-2xl'>
                                While official photos can take weeks to arrive, your gallery will be buzzing with photos even before your event ends as guests take and share photos instantly with Memories Whatsapp Bot.
                            </Text>
                        </CardBody>
                        <CardFooter>
                            <Text className='text-center text-2xl' textColor={'thistle'}>So everyone can cherish photos without waiting for days. </Text>
                        </CardFooter>
                    </Card>
                </Box>
              </Card>  
            <Center>
                <Link to="/loginpage">
                    <button className="bg-white-500 hover:bg-purple-600 text-purple border border-purple-500 hover:border-purple-600 p-2 m-10 rounded-full shadow-2xl px-10">
                        Get Started
                    </button>
                </Link>
            </Center>
    <Footer/>

    </>
  );
};

export default Firstpage;
