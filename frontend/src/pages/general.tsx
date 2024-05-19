import { Box, Grid,GridItem, Button, Heading, Flex, Text, Center } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import NavVer from "../components/NavVer";
import NavBot from "../components/NavBot";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);


const General : React.FC = () => {

  const storage_without_premimum= 2147483648;
  const storage_with_premimum = 214748364800;
  const navigate = useNavigate();
  const [storage, setStorage] = useState(0);
  const [event, setEvent] = useState({});
  const [user, setUser] = useState({});
  
  const {id} = useParams();

  useEffect(() => {
    
    console.log(localStorage.getItem("user"));
    if(localStorage.getItem("user") == null){
      navigate('/');
    }
  })



  useEffect (() => {
    axios
      .get(`/api/general/geteventdetails/${id}`)
      .then((response) => {
        console.log(response.data.data);
        setStorage(response.data.data.filesize);
        setEvent(response.data.data.event);
        setUser(response.data.data.user);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const handleDeleteEvent =(e) =>{
    e.preventDefault();
    axios.delete(`/api/general/deleteEvent/${id}`)
    .then((response) => {
      console.log(response.data.data);
      navigate("/homepage");
    })
    .catch((error) => {
      console.error(error);
    });
  }

    console.log(storage);

  const storageData = [{label: 'Storage Used', value: storage}, {label: 'Total Storage', value:user?.premium ?storage_with_premimum:storage_without_premimum}];

  const data = {
    labels: storageData.map((item) => item.label),
    datasets: [
      {
        data: storageData.map((item) => item.value),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };




    return (
        <>
        <Grid
         templateAreas={{
          base: `"header"
                 "main"
                 "footer"`,
          md: `"header header"
               "nav main"
               "footer footer"`
        }}
        gridTemplateRows={{
          base: 'auto 1fr 80px',
          md: '50px 1fr 80px'
        }}
        gridTemplateColumns={{
          base: '1fr',
          md: '200px 1fr'
        }}
        h='100vh'
        gap={1}
        color='blackAlpha.700'
        fontWeight='bold'
      >
        <GridItem pl='2' area={'header'}>
          <NavBar {...{profile: true, memories: true}} />
        </GridItem>
        
        <GridItem py={'10'} area={'nav'}  borderRightColor='purple.300' borderRightWidth='3px'  boxShadow="md" my={'10'}
            position="relative"
        >
          <NavVer/>
         </GridItem>
        <GridItem area={'main'} py={'10'} px={'10'}  my={'10'}>
        <Box>
                  
           <Flex
                direction="column"
                align="center"
                justify="center"
                bg="blue.500"
                color="white"
                py={10}
                px={5}
                textAlign="center"
              >
                <Heading as="h1" size="xl" mb={4}>
                  {event?.event_name}
                </Heading>
                <Text fontSize="lg" mb={4}>Owner: {user?.firstname}</Text>

                <Text fontSize="lg" mb={4}>
                  {event?.event_description}
                </Text>
                <Text fontSize="md" fontWeight="bold">
                  Event Type: {event.event_type? event.event_type : "None"}
                </Text>
              </Flex>
            <Button width="100%" onClick={handleDeleteEvent}> Delete Event</Button>

            <Box p={5} bg="white" boxShadow="md" borderRadius="md">
            <Heading as="h3" size="lg" mb={5} textAlign="center">
              File Storage Usage
            </Heading>
            <Center height={300} width={300}>
            <Pie data={data}  />
            </Center>
          </Box>
            </Box>
        </GridItem>

        <GridItem area={'footer'}  position={{base: 'fixed', md: 'relative'}} bottom="0" width={'100%'}>
          <NavBot/>
        </GridItem>
      </Grid>
        </>
    )
}

export default General;