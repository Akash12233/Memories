import { ChakraProvider,  Grid, GridItem, Box,Button, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import NavBar from './NavBar';  // Assuming NavBar and Column are components you've created
import Column from './colmun';
import { SearchIcon, AddIcon } from '@chakra-ui/icons';

const MyGrid = () => {
  return (
    <ChakraProvider>
      <Grid
        templateAreas={`"header header"
                        "nav main"
                        "nav footer"`}
        gridTemplateRows={'50px 1fr 80px'}
        gridTemplateColumns={'200px 1fr'}
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
                <Box p="4">
                <InputGroup>
                <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input type="text" placeholder="Search..." />
                </InputGroup>

                <Button mt="4" colorScheme="teal" leftIcon={<AddIcon />}>
                Create Event
                </Button>
                </Box>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
};

export default MyGrid;
