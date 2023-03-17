import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

interface AnalyticsCardProps {
  title: string;
  amount: string;
  date: string;
  children: React.ReactNode;
}
export default function AnalyticCard(props: AnalyticsCardProps) {
  const { title, amount, date, children } = props;
  return (
    <Box
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={'sm'}
      borderRadius={"md"}
      borderWidth={"1px"}
      m={"auto"}
      mt="35px"
      maxW={"315px"}
      paddingLeft={"10px"}
      paddingTop={"10px"}
    >
      <Stat>
        <StatLabel>{title}</StatLabel>
        <Box display="flex" justifyContent={"space-between"} mr="15px">
          <StatNumber>{amount}</StatNumber>
          {children}
        </Box>
        <StatHelpText>{date}</StatHelpText>
      </Stat>
    </Box>
  );
}
