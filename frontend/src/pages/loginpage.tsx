import React from 'react';
import { useState } from 'react';
import { Center, Heading,Text, Image ,Box, Stack,Button ,FormControl, FormLabel, Input, InputGroup, InputRightElement} from '@chakra-ui/react'
import { Card,  CardBody } from '@chakra-ui/react'
import Navbar from '../Navbar.tsx';
import Footer from '../Fotter.tsx';
import {
    FormErrorMessage, FormHelperText } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import{useAuthContext} from '../hooks/useAuthContext.tsx';


const LoginPage: React.FC =()=>{

const [user, setGetUser] = useState();
    
const {dispatch} = useAuthContext();

const {register, handleSubmit} = useForm()
const navigate = useNavigate();
const [email, setInput] = useState('');
const [password, setpassord] = useState('');
const handleInputChange = (e) => setInput(e.target.value);
const handlepasswordChange=(e)=>setpassord(e.target.value);
const isError = email === '';
const [error, seterror]=useState('');
const [show, setShow] = React.useState(false);
const handleClick = () => setShow(!show);

const login = async(e) =>{
    e.preventDefault()
    if(!isError){
        try {
            const response = await axios.post('/api/user/login', {
              email,
              password,
            });
            console.log('Login successful:', response.data.data);
            
            localStorage.setItem("user", JSON.stringify(response.data.data.user));
            localStorage.setItem("refreshToken", response.data.data.refreshToken);
            localStorage.setItem("accessToken", response.data.data.accessToken);
            dispatch({type: "LOGIN", payload:response.data.data.user , refreshToken: response.data.data.refreshToken, accessToken: response.data.data.accessToken});
    
            navigate('/homepage');
            // Handle success, e.g., redirect to another page
          } catch (error) {
            // Handle error here, e.g., display an error message
            console.error('Error during login:', error);
            seterror("Invalid email or password");
          }
    }
    else{
        seterror("Invalid email or password");
    }

}




    return (
        <>
        <Navbar/>
        <Center   bgGradient='linear(to-r, gray.200, pink.500)'>
            <Card
                direction={{ base: 'column', lg: 'row' }}
                overflow='hidden'
                variant='outline'
                >
                <Image
                    objectFit='cover'
                    maxW={{  sm: '400px' }}
                    src='./public/m2.jpg'
                />
                

                <Stack>
                <Card
                    w={{ base: '90%', sm: 'auto' }} // Adjusted width for mobile view
                    mx='auto' // Centering the card horizontally
                    mt={{ base: '8', sm: '0' }} // Adjust margin top for mobile view
                >
                    <CardBody 
                        px={{ base: '4', sm: '8' }} // Adjusted padding for mobile view
                        py='8' // Padding remains the same
                        maxW='400px' // Maximum width for mobile view
                    >
                        <Heading size='md' textAlign='center' fontSize={{ base: '2xl', sm: '3xl' }}>Welcome To Memories</Heading>
                        <Text py='4' textAlign='center' fontSize={{ base: 'lg', sm: 'xl' }} textColor='thistle'>
                            Unlock the new way of managing events and sharing photos
                        </Text>
                        <form onSubmit={login}>
                        <FormControl isInvalid={isError}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                placeholder="Enter your email"
                                type="email"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                    }
                                })}
                                onChange={handleInputChange}
                            />
                            {!isError ? (
                                <FormHelperText>Enter the proper email.</FormHelperText>
                            ) : (
                                <FormErrorMessage>Email is required.</FormErrorMessage>
                            )}
                            <InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    type={show ? 'text' : 'password'}
                                    {...register("password", {
                                        required: true,
                                    })}
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
                            <span className='text-red-500'>{error} </span>
                        </FormControl>
                        </form>
                        <Box textAlign='center' mt='4'>
                            <Text>----------------Continue with----------------</Text>
                            <Link to={"/errorpage"}>
                            <Button variant='solid' colorScheme='purple' textAlign='center' m='2'>
                                Google
                            </Button>
                            </Link>    
                        </Box>
                        <Card >
                            <Center py='4'>
                                <Link to="/registerpage" color='purple'>Don't have an account yet?</Link>
                            </Center>
                        </Card>
                    </CardBody>
                </Card>
                    
                </Stack>
               
                </Card>
            </Center>
        <Footer/>
        
        </>
    )
}

export default LoginPage
