import {  Box, VStack, FormControl, FormLabel, Input, Textarea, Select, Button,FormErrorMessage } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import NavBar from './NavBar';

const CreateEvent:React.FC=()=>{

    return (
        <>
      <NavBar/>  
      <Box p="4" align="center">
        <VStack spacing="4" w="50%">
          {/* Event's name */}
          <FormControl isRequired>
            <FormLabel>Event's name</FormLabel>
            <Input type="text" placeholder="Enter event name" />
            <FormErrorMessage>* Required</FormErrorMessage>
          </FormControl>

          {/* Event type with an option to select or input a custom type */}
          <FormControl isRequired>
            <FormLabel>Event type</FormLabel>
            <Select placeholder="Select event type">
            <optgroup label='Frequently used'>
              <option value="concert">Engagement</option>
              <option value="corporate">Corporate</option>
              <option value="wedding">Wedding</option>
              <option value="engagement">Engagement</option>
            </optgroup>

            <optgroup label='College & School Event'>
              <option value="annual">Annual Festival</option>
              <option value="cutural">Cutural Festival</option>
              <option value="sport">Sport Festival</option>
              <option value="techfestival">Tech Festival</option>
              <option value="convocation">Convocation</option>
              <option value="dance">Dance Event</option>
            </optgroup>

            <optgroup label='Corporate'>
              <option value="conference">Conference</option>
              <option value="founderday">Founder's Day</option>
              <option value="annualcelebration">Annual Celebration</option>
            </optgroup>

            <optgroup label='Other'>
              <option value="award">Award Show</option>
              <option value="exhibition">Exibhition</option>
              <option value="music">Music Concert</option>
              <option value="fundraiser">Fundraiser</option>
              <option value="other">Other</option>
            </optgroup>
            </Select>
            <FormErrorMessage>* Required</FormErrorMessage>
          </FormControl>

          {/* Description */}
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea placeholder="Enter event description" />
            <FormErrorMessage>* Required</FormErrorMessage>
          </FormControl>

          {/* Location */}
          <FormControl isRequired>
            <FormLabel>Location</FormLabel>
            <Input type="text" placeholder="Enter event location" />
            <FormErrorMessage>* Required</FormErrorMessage>
          </FormControl>

          {/* Start Date */}
          <FormControl isRequired>
            <FormLabel>Start Date</FormLabel>
            <Input type="date" />
            <FormErrorMessage>* Required</FormErrorMessage>
          </FormControl>

          {/* Last Date */}
          <FormControl isRequired>
            <FormLabel>Last Date</FormLabel>
            <Input type="date" />
            <FormErrorMessage>* Required</FormErrorMessage>
          </FormControl>

          {/* Buttons */}
          <Button colorScheme="teal" leftIcon={<AddIcon />} onClick={() => console.log('Create button clicked')}>
            Create
          </Button>
          <Button onClick={() => console.log('Cancel button clicked')}>Cancel</Button>
        </VStack>
      </Box>
        </>
    )
}

export default CreateEvent