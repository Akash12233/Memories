import { useState } from "react";
import { WarningIcon } from "@chakra-ui/icons";
import { Box, Icon, Text, CloseButton } from "@chakra-ui/react";

const PopupAlert = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <Box
        role="alert"
        p={4}
        bg="red.50"
        border="1px"
        borderColor="red.200"
        borderRadius="md"
        display="flex"
        alignItems="center"
      >
        <Icon as={WarningIcon} w={5} h={5} color="red.400" mr={3} />
        <Text color="red.700" fontWeight="bold" flex="1">
          {message}
        </Text>
        <CloseButton onClick={handleClose} />
      </Box>
    )
  );
};

export default PopupAlert;