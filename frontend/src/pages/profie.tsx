import { Grid, GridItem ,Box, Input, Avatar, VStack, Text,Button,Flex,IconButton} from "@chakra-ui/react";
import NavBar from '../components/NavBar';  // Assuming NavBar and Column are components you've created
import Column from '../components/colmun';
import { AddIcon} from "@chakra-ui/icons";
import { useRef ,useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Profile: React.FC =()=>{

  const inputref=useRef(null);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    mobilenumber: '',
    avatar: null
  });
  const navigate = useNavigate();
  const handleInputChange = (field, value) => {
    
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

 try{
  useEffect(() => {
    
    const userData = localStorage.getItem('user');
    if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        
    } 
},[]);
 }
  catch (error) {
    console.error("Error retrieving user data from localStorage:", error);
    navigate('/');
}
  const handleFileChange = () => {
      inputref.current.click();
    };

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submitted with data:', {...formData});

        axios.post('/api/user/update-account', {
          email: formData.email,
          firstname: formData.firstname,
          lastname: formData.lastname,
          mobilenumber: formData.mobilenumber,
          avatar: formData.avatar
        },
        {
          headers: {
              'Content-Type': 'multipart/form-data',
          }
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
      
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
          <NavBar {...{profile:true,memories:true}} />
        </GridItem>
        <GridItem py={'10'} area={'nav'} h='100%' borderRightColor='purple.300' borderRightWidth='3px'  boxShadow="md" my={'10'} >
            <Column />
        </GridItem>
        <GridItem area={'main'} py={'10'} px={'10'} h='100%' my={'10'}>
                
    <form onSubmit={handleSubmit}> 
    <Box p="4" alignItems="center">
        <VStack spacing="4">
        <Text className="text-3xl"> Hello! {user?.firstname}</Text>
        <Text>Update your personal information here.</Text>
        
                <Flex >
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
                    <input  type='file' ref={inputref} style={{display:"none"}} onChange={(e) => handleInputChange('avatar', e.target.files?.[0])} / >
                  </div>
                </Flex>

                <Flex>
                    <Box mr="20">
                    <Text>First Name</Text>
                    <Input type="text" placeholder={user?.firstname}  onChange={(e) => handleInputChange('firstname', e.target.value)} />
                    </Box>
                    <Box>
                    <Text>Last Name</Text>
                    <Input type="text" placeholder={user?.lastname} onChange={(e) => handleInputChange('lastname', e.target.value)} />
                    </Box>
                </Flex>

                <Flex>
                <Box mr="20">
                <Text>Mobile Number</Text>  
                  <Input type="tel" placeholder="Mobile Number"  onChange={(e) => handleInputChange('mobilenumber', e.target.value)}/>
                </Box>

                <Box>
                <Text>Email</Text>
                  <Input type="email" placeholder={user?.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                </Box>
                </Flex>
              <Button colorScheme="teal" leftIcon={<AddIcon />} mt="4" type="submit">
                Save
              </Button>
          
         
        </VStack>
      </Box>
      </form>
      </GridItem>
      </Grid>
        
        </>
  )};

  

export default Profile;