import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";

interface BillingRowProps {
  amount: number | string;
  remarks: string;
  phoneNumber: string;
  date: string;
}
function BillingRow(props: BillingRowProps) {
  const bgColor = useColorModeValue("#F8F9FA", "gray.800");
  const { amount, remarks, phoneNumber, date } = props;

  return (
    <Box p="24px" bg={bgColor} my="22px" borderRadius="12px">
      <Flex justify="space-between" w="100%">
        <Flex direction="column" maxWidth="70%">
          <Text fontSize="md" fontWeight="bold" mb="10px">
            {amount}
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Remarks:{" "}
            <Text as="span" color="gray.500">
              {remarks}
            </Text>
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Phone number:{" "}
            <Text as="span" color="gray.500">
              {phoneNumber}
            </Text>
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="semibold">
            Date:{" "}
            <Text as="span" color="gray.500">
              {date}
            </Text>
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default BillingRow;
