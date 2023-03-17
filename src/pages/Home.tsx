import {
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import HomeIllustration from "../components/home-illustration";
import { useNavigate } from "react-router-dom";
import styles from './home.module.css';
import WhiteBox from "../components/white-box";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontFamily={"League Spartan"}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          className={styles.spartan}
          lineHeight={"110%"}
        >
          M-BOX{" "}
          <Text as={"span"} color={"orange.400"}>
            Accounting Made Easy
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          Quickly record a transaction with your camera and AI. Search for a
          transaction with ease. Make record keeping easy!!!
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Button
            rounded={"full"}
            px={6}
            onClick={() => navigate(`/sign-up`)}
            colorScheme={"orange"}
            fontFamily={"League Spartan"}
            bg={"orange.400"}
            _hover={{ bg: "orange.500" }}
          >
            Get started
          </Button>
          {/*<Button rounded={'full'} px={6}>
						Learn more
					</Button>*/}
        </Stack>
        <Flex w={"full"}>
          <HomeIllustration
            height={{ sm: "24rem", lg: "28rem" }}
            mt={{ base: 12, sm: 16 }}
          />
        </Flex>
        <WhiteBox><p>hello wolrd</p></WhiteBox>
      </Stack>
    </Container>
  );
}
