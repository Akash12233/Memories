import { Grid, GridItem ,Box, Input, Avatar, VStack, Text,Button,Flex,IconButton} from "@chakra-ui/react";
import NavBar from './NavBar';  // Assuming NavBar and Column are components you've created
import Column from './colmun';
import { AddIcon} from "@chakra-ui/icons";
import { useRef } from "react";

const Profile: React.FC =()=>{

    const inputref=useRef(null);

    const handleFileChange = () => {
        inputref.current.click();
      };

    return (
        <>
      <Grid
        templateAreas={`"header header"
                        "nav main"
                        "nav footer"`}
        gridTemplateRows={'50px 1fr 80px'}
        gridTemplateColumns={'150px 1fr'}
        h='100vh'  // Set the height of the grid to 100% of the viewport height
        gap='1'
        color='blackAlpha.700'
        fontWeight='bold'
      >
        <GridItem pl='2' area={'header'}>
          <NavBar />
        </GridItem>
        <GridItem py={'10'} area={'nav'} h='100%' borderRightColor='purple.300' borderRightWidth='3px'  boxShadow="md" my={'10'} >
            <Column />
        </GridItem>
        <GridItem area={'main'} py={'10'} px={'10'} h='100%' my={'10'}>
                
       
    <Box p="4" alignItems="center">
        <VStack spacing="4">
        <Text className="text-3xl"> Hello! getuser.firstName</Text>
        <Text>Update your personal information here.</Text>

        <Flex>
        <Avatar size="xl"  name="Profile Photo" src="./public/default-profile.jpg" />
        <div p="4"  onClick={handleFileChange}>
        <IconButton
                isRound={true}
                variant='solid'
                colorScheme='teal'
                aria-label='Done'
                fontSize='20px'
                icon={<AddIcon />}
                />
        <input  type='file' ref={inputref} style={{display:"none"}}  / >
      </div>
    </Flex>

        <Flex>
            <Box mr="20">
            <Text>First Name</Text>
            <Input type="text" placeholder="First Name" />
            </Box>
            <Box>
            <Text>Last Name</Text>
            <Input type="text" placeholder="Last Name" />
            </Box>
        </Flex>

        <Flex>
        <Box mr="20">
        <Text>Mobile Number</Text>  
          <Input type="tel" placeholder="Mobile Number" />
        </Box>

        <Box>
        <Text>Email</Text>
          <Input type="email" placeholder="Email" />
        </Box>
        </Flex>
          <Button colorScheme="teal" leftIcon={<AddIcon />} mt="4">
            Save
          </Button>
        </VStack>
      </Box>
      </GridItem>
      </Grid>
        
        </>
    );
};

export default Profile;