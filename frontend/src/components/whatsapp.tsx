import { Grid,GridItem } from "@chakra-ui/react";
import NavBar from "./NavBar";
import NavVer from "./NavVer";
import NavBot from "./NavBot";

const Whatsapp : React.FC = () => {
    return (
        <>
        <Grid
            templateAreas={`"header header"
                            "nav main"
                            "nav footer"`}
            gridTemplateRows={'50px 1fr 30px'}
            gridTemplateColumns={'150px 1fr'}
            h='200px'
            gap='1'
            color='blackAlpha.700'
            fontWeight='bold'
            >
            <GridItem pl='2'  area={'header'}>
                <NavBar/>
            </GridItem>
            <GridItem pl='2'  area={'nav'} >
                <NavVer/>
            </GridItem>
            <GridItem pl='2' area={'main'}>
                Main
            </GridItem>
            <GridItem pl='2' area={'footer'}>
                <NavBot/>
            </GridItem>
            </Grid>
        </>
    )
}

export default Whatsapp;