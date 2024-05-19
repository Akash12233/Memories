import { Box, Grid, GridItem, Text, Center } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import NavVer from "../components/NavVer";
import NavBot from "../components/NavBot";
import QRCode from 'qrcode.react';
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Sharing: React.FC = () => {
  const [guesturl, setguesturl] = useState('');
  const [cohosturl, setcohosturl] = useState('');
  const [event, setEvent] = useState<any>({});

  const {id} =useParams();

  const navigate = useNavigate();

  useEffect(() => {
    
    console.log(localStorage.getItem("user"));
    if(localStorage.getItem("user") == null){
      navigate('/');
    }
  });

  useEffect(() => {
    // Fetch user data
    axios.get(`/api/event/geteventbyid/${id}`)
      .then((response) => {
        console.log(response.data.data);
        setguesturl(`${process.env.REACT_APP_PORT}/urlmedia/${id}`)
        setcohosturl( `${process.env.REACT_APP_PORT}/eventhome/${id}/${response.data.data.cohostid}`)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

    

    console.log(guesturl, cohosturl);


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
          base: 'auto 1fr auto',
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
        <GridItem pl={2} area={'header'}>
          <NavBar {...{profile: true, memories: true}} />
        </GridItem>
        <GridItem
          py={'10'} area={'nav'}  borderRightColor='purple.300' borderRightWidth='3px'  boxShadow="md" my={'10'}
          position="relative"
        >
         <NavVer />
        </GridItem>
        <GridItem area={'main'} py={10} px={10} h='100%' my={10}>
          <Box className="flex flex-col items-center" mb={4}>
            <Text fontSize={'2xl'} fontWeight={'bold'} color={'purple.300'}>QR for GUEST</Text>
            {guesturl && (
              <Center>
                <QRCode value={guesturl} />
              </Center>
            )}
          </Box>
          <Box className="flex flex-col items-center">
            <Text fontSize={'2xl'} fontWeight={'bold'} color={'purple.300'}>QR for CO-HOST</Text>
            {cohosturl && (
              <Center>
                <QRCode value={cohosturl} />
              </Center>
  
            )}
          </Box>
        </GridItem>

        <GridItem area={'footer'}  position="absolute" bottom="0" width={'100%'}>
          <NavBot/>
        </GridItem>
      </Grid>
    </>
  );
}

export default Sharing;
