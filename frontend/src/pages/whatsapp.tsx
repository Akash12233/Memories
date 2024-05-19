import { Grid,GridItem , Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer, Heading, Box} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import NavVer from "../components/NavVer";
import NavBot from "../components/NavBot";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Whatsapp : React.FC = () => {

  const [guest, setguest] = useState({});

  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(() => {
    
    console.log(localStorage.getItem("user"));
    if(localStorage.getItem("user") == null){
      navigate('/');
    }
  })

  useEffect(() => {
    axios.get(`/api/guest/getguest/${id}`)
      .then((response) => {
        setguest(response.data.data.guest);
        
      })
      .catch((error) => {
        console.error(error);
      });
  },[])

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

        <GridItem area={'main'} py={'10'} px={'10'}  height={'100%'} my={'10'}>
            
              <Box p={5} bg="white" boxShadow="md" borderRadius="md">
                <Heading as="h3" size="lg" mb={5} textAlign="center">
                  Contact List
                </Heading>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Mobile Number</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {Array.isArray(guest) && guest.map((item) => (
                        <Tr key={item.id}>
                          <Td>{item.guest_name}</Td>
                          <Td>{item.mobile_number}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>       
        </GridItem>

        <GridItem area={'footer'}  position={{base: "fixed", md: "relative"}} bottom="0" width={"100%"} >
          <NavBot/>
        </GridItem>
      </Grid>
        </>
    )
}

export default Whatsapp;