import {
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Image,
  Text,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import WhiteBox from "../components/white-box";
import AddRecordImage from "../assets/images/record-add.png";
import Hand from "../assets/images/hand.svg";
import CheckBoard from "../assets/images/checkboard.svg";
import Spring from "../assets/images/spring.svg";
import Bobs from "../assets/images/bobs.png";
import Doodle from "../assets/images/doodle.png";
import Money from "../assets/images/money.png";
import ViewRecords from "../assets/images/view-records.png";
import Calendar from "../assets/images/calendar.png";
import Status from "../assets/images/status.png";
import Rocket from "../assets/images/rocket.png";
import TaskBar from "../assets/images/tasks-bar.png";
import AnalyticPage from "../assets/images/Analytics.png";
import AnalyticsClay from "../assets/images/analytics-clay.png";
import AnalyticsBoard from "../assets/images/analytics-board.png";
import RocketRiding from "../assets/images/rocket-riding.png";
import MainIllustration from "../assets/images/main-illustration.png";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <Container maxW={"100%"} bg={useColorModeValue("white", "gray.900")}>
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
          <Image src={MainIllustration} m="auto" mb={"90px"} mt="20px" />
          {/* <HomeIllustration
            height={{ sm: "24rem", lg: "28rem" }}
            mt={{ base: 12, sm: 16 }}
            mb={20}
          /> */}
        </Flex>
        <WhiteBox
          position={"relative"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"flex-end"}
          bg={"#FF8787"}
        >
          <Image
            src={Doodle}
            position={"absolute"}
            top={"-32px"}
            left={"-34px"}
          />
          <Image
            src={Hand}
            position={"absolute"}
            bottom={"120px"}
            left="-40px"
          />
          <Image
            src={Money}
            position={"absolute"}
            bottom={"-24px"}
            left={"-40px"}
          />
          <Image
            mt={6}
            mb="-13px"
            src={AddRecordImage}
            alt="record addition example"
          />
          <Image
            src={Spring}
            position={"absolute"}
            alt="spring"
            right={"12px"}
            bottom={"53px"}
          />
          <Image
            src={CheckBoard}
            position={"absolute"}
            right={"-36px"}
            bottom={"258px"}
          />
          <Image
            src={Bobs}
            position={"absolute"}
            right={"-36px"}
            bottom={"-81px"}
          />
        </WhiteBox>
        <Box pt={"50px"} textAlign={"center"}>
          <Heading fontFamily={"League Spartan"} mb={"15px"} color="orange.500">
            Easily Record Transactions!
          </Heading>
          <Container maxW={"sm"}>
            <Text mb="40px" color={"gray.500"}>
              Quickly take down Journal Numbers and amount in seconds with just
              your camera. We automatically get all the important details and
              save it for you!
            </Text>
          </Container>
        </Box>
        <WhiteBox
          position={"relative"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"flex-end"}
          bg={"#6BA7EE"}
        >
          <Image
            src={Bobs}
            position={"absolute"}
            top={"-55px"}
            left={"-45px"}
          />
          <Image
            src={Rocket}
            position={"absolute"}
            bottom={"140px"}
            left="-40px"
          />
          <Image
            src={TaskBar}
            position={"absolute"}
            bottom={"-24px"}
            left={"-40px"}
          />
          <Image
            mt={6}
            mb="-10px"
            src={ViewRecords}
            alt="record addition example"
          />
          <Image
            src={Status}
            position={"absolute"}
            alt="spring"
            right={"12px"}
            bottom={"92px"}
          />
          <Image
            src={Calendar}
            position={"absolute"}
            right={"-33px"}
            bottom={"243px"}
          />
          <Image
            src={Spring}
            position={"absolute"}
            right={"-21px"}
            bottom={"-81px"}
          />
        </WhiteBox>
        <Box pt={"50px"} textAlign={"center"}>
          <Heading fontFamily={"League Spartan"} mb={"15px"} color="orange.500">
            Quickly View Transactions!
          </Heading>
          <Container maxW={"sm"}>
            {" "}
            <Text mb="40px" color={"gray.500"}>
              Instantly look up all your recorded transactions. You can also
              filter them according to their date!
            </Text>
          </Container>
        </Box>
        <WhiteBox
          position={"relative"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"flex-end"}
          bg={"#7478C4"}
        >
          <Image
            src={RocketRiding}
            position={"absolute"}
            top={"-55px"}
            left={"-70px"}
          />
          <Image
            src={Spring}
            position={"absolute"}
            bottom={"332px"}
            left="278px"
          />
          <Image
            src={AnalyticsClay}
            position={"absolute"}
            bottom={"-66px"}
            left={"-60px"}
          />
          <Image
            mt={6}
            mb="-5px"
            src={AnalyticPage}
            alt="record addition example"
          />
          <Image
            src={Status}
            position={"absolute"}
            alt="spring"
            right={"12px"}
            bottom={"92px"}
          />
          <Image
            src={AnalyticsBoard}
            position={"absolute"}
            right={"-25px"}
            bottom={"150px"}
          />
          <Image
            src={Bobs}
            position={"absolute"}
            right={"-23px"}
            bottom={"-81px"}
          />
        </WhiteBox>
        <Box pt={"50px"} textAlign={"center"}>
          <Heading fontFamily={"League Spartan"} mb={"15px"} color="orange.500">
            Key Insights At Your Fingertips!
          </Heading>
          <Container>
            {" "}
            <Text color={"gray.500"}>
              Get information on your business at a glance. We provide you with
              the number of transactions, your highest transaction and more!
            </Text>
          </Container>
        </Box>
      </Stack>
    </Container>
  );
}
