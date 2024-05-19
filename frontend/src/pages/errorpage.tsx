import React from 'react';
import { Box, Text, Icon } from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';


const ErrorMessage: React.FC = () => {
  return (
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
      <Text color="red.700" fontWeight="bold">
        Coming Soon
      </Text>
    </Box>
  );
};

export default ErrorMessage;
