import {
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Image,
  Text, useColorModeValue
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import WhiteBox from "../components/white-box";
import AddRecordImage from "../assets/images/record-add.png";
import Hand from "../assets/images/hand.png";
import CheckBoard from "../assets/images/checkboard.png";
import Spring from "../assets/images/spring.png";
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
import { forwardRef, useEffect, useRef } from "react";
import { Maybe } from "../utils/util.types";
import SellingPointText from "../components/selling-point-text";
import { HomeTranslations } from "../constants/text.constants";

export default function HomePage() {
  const componentRefs = useRef<Maybe<HTMLDivElement>[]>([null, null, null]);
  const navigate = useNavigate();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.fadeIn);
          }
        });
      },
      { threshold: 0.5 }
    );
    componentRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);
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
        </Stack>
        <Flex w={"full"}>
          <Image src={MainIllustration} m="auto" mb={"90px"} mt="20px" />
        </Flex>
        <CaptureComponent
          ref={(element) => (componentRefs.current[0] = element)}
        >
          <SellingPointText
            title={HomeTranslations.EASY_TO_USE}
            description={HomeTranslations.EASY_TO_USE_DESCRIPTION}
          />
        </CaptureComponent>
        <ViewRecordsComponent
          ref={(element) => (componentRefs.current[1] = element)}
        >
          <SellingPointText
            title={HomeTranslations.QUICK_VIEW}
            description={HomeTranslations.QUICK_VIEW_DESCRIPTION}
          />
        </ViewRecordsComponent>
        <InsightsComponent
          ref={(element) => (componentRefs.current[2] = element)}
        >
          <SellingPointText
            title={HomeTranslations.ANALYTICS}
            description={HomeTranslations.ANALYTICS_DESCRIPTION}
          />
        </InsightsComponent>
      </Stack>
    </Container>
  );
}

const CaptureComponent = forwardRef<
  Maybe<HTMLDivElement>,
  { children: React.ReactNode }
>(({ children }, ref) => {
  return (
    <Container
      display={"flex"}
      flexDirection={{ base: "column", lg: "row" }}
      justifyContent={"space-evenly"}
      maxW={"5xl"}
    >
      <WhiteBox
        opacity={0}
        ref={ref}
        position={"relative"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"flex-end"}
        bg={"#FF8787"}
      >
        <Image
          decoding="async"
          loading="lazy"
          style={{ animationDelay: "0.5s" }}
          className={styles.bobble}
          src={Doodle}
          position={"absolute"}
          top={"-32px"}
          left={"-34px"}
        />
        <Image
          decoding="async"
          loading="lazy"
          className={styles.bobble}
          style={{ animationDelay: "0.5s" }}
          src={Hand}
          position={"absolute"}
          bottom={"120px"}
          left="-40px"
        />
        <Image
          decoding="async"
          loading="lazy"
          className={styles.bobble}
          style={{ animationDelay: "1.75s" }}
          src={Money}
          position={"absolute"}
          bottom={"-24px"}
          left={"-40px"}
        />
        <Image
          decoding="async"
          loading="lazy"
          mt={6}
          mb="-13px"
          src={AddRecordImage}
          alt="record addition example"
        />
        <Image
          decoding="async"
          loading="lazy"
          className={styles.bobble}
          style={{ animationDelay: "1.5s" }}
          src={Spring}
          position={"absolute"}
          alt="spring"
          right={"12px"}
          bottom={"53px"}
        />
        <Image
          decoding="async"
          loading="lazy"
          className={styles.bobble}
          style={{ animationDelay: "1.5s" }}
          src={CheckBoard}
          position={"absolute"}
          right={"-36px"}
          bottom={"258px"}
        />
        <Image
          decoding="async"
          className={styles.bobble}
          style={{ animationDelay: "1s" }}
          loading="lazy"
          src={Bobs}
          position={"absolute"}
          right={"-36px"}
          bottom={"-81px"}
        />
      </WhiteBox>
      {children}
    </Container>
  );
});

const ViewRecordsComponent = forwardRef<
  Maybe<HTMLDivElement>,
  { children: React.ReactNode }
>((props, ref) => {
  return (
    <Container
      display={"flex"}
      flexDirection={{ base: "column", lg: "row" }}
      pt={{ base: "10px", lg: "140px" }}
      justifyContent={"space-evenly"}
      maxW={"5xl"}
    >
      <WhiteBox
        opacity={0}
        ref={ref}
        position={"relative"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"flex-end"}
        bg={"#6BA7EE"}
      >
        <Image
          className={styles.bobble}
          style={{ animationDelay: "2s" }}
          decoding="async"
          loading="lazy"
          src={Bobs}
          position={"absolute"}
          top={"-55px"}
          left={"-45px"}
        />
        <Image
          className={styles.bobble}
          style={{ animationDelay: "2.5s" }}
          decoding="async"
          loading="lazy"
          src={Rocket}
          position={"absolute"}
          bottom={"140px"}
          left="-40px"
        />
        <Image
          className={styles.bobble}
          style={{ animationDelay: "1.35s" }}
          decoding="async"
          loading="lazy"
          src={TaskBar}
          position={"absolute"}
          bottom={"-24px"}
          left={"-40px"}
        />
        <Image
          decoding="async"
          loading="lazy"
          mt={6}
          mb="-10px"
          src={ViewRecords}
          alt="record addition example"
        />
        <Image
          className={styles.bobble}
          style={{ animationDelay: "2.5s" }}
          decoding="async"
          loading="lazy"
          src={Status}
          position={"absolute"}
          alt="spring"
          right={"12px"}
          bottom={"92px"}
        />
        <Image
          className={styles.bobble}
          style={{ animationDelay: "1.35s" }}
          decoding="async"
          loading="lazy"
          src={Calendar}
          position={"absolute"}
          right={"-33px"}
          bottom={"243px"}
        />
        <Image
          className={styles.bobble}
          style={{ animationDelay: "1.35s" }}
          decoding="async"
          loading="lazy"
          src={Spring}
          position={"absolute"}
          right={"-21px"}
          bottom={"-81px"}
        />
      </WhiteBox>
      {props.children}
    </Container>
  );
});

const InsightsComponent = forwardRef<
  Maybe<HTMLDivElement>,
  { children: React.ReactNode }
>((props, ref) => {
  return (
    <Container
      display={"flex"}
      flexDirection={{ base: "column", lg: "row" }}
      pt={{ base: "10px", lg: "140px" }}
      justifyContent={"space-evenly"}
      maxW={"5xl"}
    >
      <WhiteBox
        opacity={0}
        ref={ref}
        position={"relative"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"flex-end"}
        bg={"#7478C4"}
      >
        <Image
          className={styles.bobble}
          style={{ animationDelay: "1.35s" }}
          decoding="async"
          loading="lazy"
          src={RocketRiding}
          position={"absolute"}
          top={"-55px"}
          left={"-70px"}
        />
        <Image
          className={styles.bobble}
          style={{ animationDelay: "2s" }}
          decoding="async"
          loading="lazy"
          src={Spring}
          position={"absolute"}
          bottom={"332px"}
          left="278px"
        />
        <Image
          className={styles.bobble}
          style={{ animationDelay: "0.5s" }}
          decoding="async"
          loading="lazy"
          src={AnalyticsClay}
          position={"absolute"}
          bottom={"-66px"}
          left={"-60px"}
        />
        <Image
          decoding="async"
          loading="lazy"
          mt={6}
          mb="-5px"
          src={AnalyticPage}
          alt="record addition example"
        />
        <Image
          className={styles.bobble}
          style={{ animationDelay: "1.35s" }}
          decoding="async"
          loading="lazy"
          src={Status}
          position={"absolute"}
          alt="spring"
          right={"12px"}
          bottom={"92px"}
        />
        <Image
          className={styles.bobble}
          style={{ animationDelay: "1.35s" }}
          decoding="async"
          loading="lazy"
          src={AnalyticsBoard}
          position={"absolute"}
          right={"-25px"}
          bottom={"150px"}
        />
        <Image
          className={styles.bobble}
          style={{ animationDelay: "0.5s" }}
          decoding="async"
          loading="lazy"
          src={Bobs}
          position={"absolute"}
          right={"-23px"}
          bottom={"-81px"}
        />
      </WhiteBox>
      {props.children}
    </Container>
  );
});
