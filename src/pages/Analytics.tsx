import React, { useContext, useEffect } from "react";
import AnalyticCard from "../components/analytic-card";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { FcMoneyTransfer } from "react-icons/fc";
import { RiExchangeBoxLine } from "react-icons/ri";
import { IoPricetagsOutline } from "react-icons/io5";
import DropDown from "../components/dropdown";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { UserContext } from "../components/user-context";
import { getTodaysTotal } from "../api/misc.api";
import dayjs from "dayjs";

export default function Analytics() {
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user?.uid) {
      getTodaysTotal(dayjs(), user?.uid).then((data) => {
        console.log(data);
      });
    }
  }, [user?.uid]);

  return (
    <>
      <Box m={"auto"}>
        <Box
          m="auto"
          maxW={"315px"}
          bg={"gray.100"}
          mt="20px"
          p="10px"
          borderRadius={"md"}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Text mt="5px" fontSize="lg">
            Filter By:{" "}
          </Text>
          <DropDown
            activeValue="Month"
            options={[
              { value: "month", label: "Month" },
              { value: "week", label: "Week" },
              { value: "Day", label: "Day" },
            ]}
          />
          <IconButton
            icon={<AiOutlineLeft />}
            colorScheme="orange"
            aria-label={"left-arrow"}
          />
          <IconButton
            icon={<AiOutlineRight />}
            colorScheme="orange"
            aria-label={"right-arrow"}
          />
        </Box>
        <AnalyticCard
          title="Total transaction amount"
          amount="Nu. 130,000"
          date="Feb 1st - Feb 28th"
        >
          <FcMoneyTransfer size="2em" color="orange" />
        </AnalyticCard>
        <AnalyticCard
          title="Number of transactions"
          amount="4000"
          date="Feb 1st - Feb 28th"
        >
          <RiExchangeBoxLine size="2em" color="orange" />
        </AnalyticCard>
        <AnalyticCard
          title="Highest transaction amount"
          amount="Nu. 8000"
          date="Feb 1st - Feb 28th"
        >
          <IoPricetagsOutline size="2em" color="orange" />
        </AnalyticCard>
      </Box>
    </>
  );
}
