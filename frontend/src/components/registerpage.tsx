import Navbar from '../Navbar';
import Footer from '../Fotter';
import React from 'react';


import {
    Center,
    CSSReset,
    Box,
    Container,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Button,
    Heading,
    InputGroup,
    InputRightElement,
    Stack,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  
  const Registerpage: React.FC = () => {
    const [formData, setFormData] = useState({
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      confirmPassword: '',
    });
  
    const [passwordStrength, setPasswordStrength] = useState('');
  
    const handleInputChange = (field, value) => {
      setFormData((prevData) => ({ ...prevData, [field]: value }));
    };
  
    const handlePasswordChange = (value) => {
      setFormData((prevData) => ({ ...prevData, password: value }));
      
      // Example: Check password strength (update this logic based on your requirements)
      if (value.length >= 8) {
        setPasswordStrength('Strong');
      } else if (value.length >= 6) {
        setPasswordStrength('Moderate');
      } else {
        setPasswordStrength('Weak');
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Your login/registration logic here
      console.log('Form submitted:', formData);
    };
  
    return (
        <>
        <Navbar/>
        <Center  bgGradient='linear(to-r, gray.200, pink.500)'>
        <CSSReset />
        <Container centerContent p={4} bg="purple.500" minHeight="100vh">
          <Box
            p={8}
            maxWidth="800px"
            width="100%"
            bg="white"
            borderRadius="md"
            boxShadow="md"
          >
            <Heading mb={4}>Memories</Heading>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl isRequired isInvalid={formData.email === ''}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                </FormControl>
  
                <FormControl isRequired isInvalid={formData.firstname === ''}>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    placeholder="Enter your first name"
                    value={formData.firstname}
                    onChange={(e) => handleInputChange('firstname', e.target.value)}
                  />
                  <FormErrorMessage>First Name is required.</FormErrorMessage>
                </FormControl>
  
                <FormControl isRequired isInvalid={formData.lastname === ''}>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    placeholder="Enter your last name"
                    value={formData.lastname}
                    onChange={(e) => handleInputChange('lastname', e.target.value)}
                  />
                  <FormErrorMessage>Last Name is required.</FormErrorMessage>
                </FormControl>
  
                <FormControl isRequired isInvalid={formData.password === ''}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      {passwordStrength && (
                        <FormErrorMessage fontSize="sm" color="purple.500">
                          Password Strength: {passwordStrength}
                        </FormErrorMessage>
                      )}
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>Password is required.</FormErrorMessage>
                </FormControl>
  
                <FormControl
                  isRequired
                  isInvalid={formData.password !== formData.confirmPassword}
                >
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange('confirmPassword', e.target.value)
                    }
                  />
                  <FormErrorMessage>
                    Passwords do not match.
                  </FormErrorMessage>
                </FormControl>
  
                <Button type="submit" colorScheme="purple" width="100%">
                  Submit
                </Button>
              </Stack>
            </form>
          </Box>
          </Container>
          </Center>
        <Footer/>
        </>
    );
  };
  
export default Registerpage;