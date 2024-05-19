import { Flex, Image, Box, useMediaQuery } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavVer: React.FC = () => {
  const id = localStorage.getItem("event_id");
  const [isLargerThanMd] = useMediaQuery("(min-width: 48em)");

  const navItems = [
    { to: `/general/${id}`, src: "/icon8.png", alt: "General Icon", label: "General" },
    { to: `/whatsapp/${id}`, src: "/profile.jpg", alt: "Whatsapp Icon", label: "Whatsapp" },
    { to: `/sharing/${id}`, src: "/myaccount.jpg", alt: "MySharing Icon", label: "MySharing" }
  ];

  return (
    <>
      <Flex
        direction={isLargerThanMd ? "column" : "column"}
        w="20%"
        p={isLargerThanMd ? "4" : "2"}
        bg={isLargerThanMd ? "transparent" : "white"}
        position={isLargerThanMd ? "relative" : "fixed"}
        top={isLargerThanMd ? "auto" : "100"}
        left={isLargerThanMd ? "auto" : "0"}
        right={isLargerThanMd ? "auto" : "0"}
      
        boxShadow={isLargerThanMd ? "none" : "0 -2px 5px rgba(0, 0, 0, 0.1)"}
        zIndex="1"
      >
        {navItems.map((item, index) => (
          <Box key={index} p="2" mb={isLargerThanMd ? "4" : "0"} m={isLargerThanMd ? "0" : "2"} _hover={{ bg: "white" }}>
            <Link to={item.to} className="hover:bg-white hover:text-purple-500">
              <Flex align={'center'}>
                <Image src={item.src} alt={item.alt} boxSize="6" mr={isLargerThanMd ? "2" : "0"} />
                {isLargerThanMd && <Box ml="2">{item.label}</Box>}
              </Flex>
            </Link>
          </Box>
        ))}
      </Flex>
    </>
  );
}

export default NavVer;
