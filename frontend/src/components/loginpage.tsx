import React from 'react';
import { useState, useEffect } from 'react';
import { Center, Heading,Text, Image ,Box, Stack,Button ,FormControl, FormLabel, Input, InputGroup, InputRightElement} from '@chakra-ui/react'
import { Card,  CardBody } from '@chakra-ui/react'
import Navbar from '../Navbar';
import Footer from '../Fotter';
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody,PopoverHeader,
    FormErrorMessage, FormHelperText } from '@chakra-ui/react'

const LoginPage: React.FC =()=>{

const [email, setInput] = useState('');
const [password, setpassord] = useState('');
const handleInputChange = (e) => setInput(e.target.value);
const handlepasswordChange=(e)=>setpassord(e.target.value);
const isError = email === '';
const [show, setShow] = React.useState(false);
const handleClick = () => setShow(!show);

const handleLogin = (e) =>{
    e.preventDefault()
    if(!isError){
        console.log(email,password);
    }
}




    return (
        <>
        <Navbar/>
        <Center  h='80vh' bgGradient='linear(to-r, gray.200, pink.500)'>
            <Card
                direction={{ base: 'column', lg: 'row' }}
                overflow='hidden'
                variant='outline'
                h='70vh'
                >
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '400px' }}
                    src='./public/m2.jpg'
                />

                <Stack >
                    
                    <CardBody>
                    <Heading size='md' className='text-5xl text-center'> Welcome To Memories</Heading>

                    <Text py='4' className='text-xl text-center' textColor={'thistle'}>
                    Unlock the new way of managing events and sharing photos
                    </Text>
                    <Box  className='text-center'>
                    <Popover>
                        <PopoverTrigger>
                        <Button variant='solid' colorScheme='purple' textAlign={'center'} m={'10'}>
                            Login with Email
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Login</PopoverHeader>
                            <PopoverBody>
                            <form onSubmit={handleLogin}>
                            <FormControl isInvalid={isError}>
                                <FormLabel>Email</FormLabel>
                                <Input type='email' value={email} onChange={handleInputChange} />
                                {!isError ? (
                                <FormHelperText>Enter the proper email.</FormHelperText>
                                ) : (
                                <FormErrorMessage>Email is required.</FormErrorMessage>
                                )}
                                <InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    type={show ? 'text' : 'password'}
                                    onChange={handlepasswordChange}
                                    placeholder='Enter password'
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                                </InputGroup>

                                <Button mt={4} colorScheme='teal' type='submit'>
                                Submit
                                </Button>
                            </FormControl>
                            </form>
                            </PopoverBody>
                        </PopoverContent>
                        </Popover>
                        
                        <Text>----------------Continue with----------------</Text>
                        <Button variant='solid' colorScheme='purple' textAlign={'center'}  m={'10'}>
                            Google
                        </Button>
                    </Box>
                    </CardBody>
                    
                </Stack>
               
                </Card>
            </Center>
        <Footer/>
        
        </>
    )
}

export default LoginPage
