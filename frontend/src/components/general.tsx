import { Grid,GridItem } from "@chakra-ui/react";
import NavBar from "./NavBar";
import NavVer from "./NavVer";
import NavBot from "./NavBot";

const General : React.FC = () => {
    return (
        <>
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
        <GridItem py={'10'} area={'nav'}  borderRightColor='purple.300' borderRightWidth='3px'  boxShadow="md" my={'10'}
            position="relative"
        >
            <NavVer/>
        </GridItem>
        <GridItem area={'main'} py={'10'} px={'10'} h='100%' my={'10'}>
            Main
        </GridItem>
        <GridItem area={'footer'}  position="absolute" bottom="0" width="100%">
          <NavBot/>
          </GridItem>
      </Grid>
        </>
    )
}

export default General;