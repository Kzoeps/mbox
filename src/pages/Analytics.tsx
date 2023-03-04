import { useContext, useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import AnalyticCard from "../components/analytic-card";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { FcMoneyTransfer } from "react-icons/fc";
import { RiExchangeBoxLine } from "react-icons/ri";
import { IoPricetagsOutline } from "react-icons/io5";
import { DateRange } from "react-date-range";
import { UserContext } from "../components/user-context";
import { getTodaysTotal } from "../api/misc.api";
import dayjs from "dayjs";
import GenericDialog from "../components/generic-dialog";
import { DateFormats } from "../types/enums";
import { AiOutlineCalendar } from "react-icons/ai";

const getDisplayDate = (start?: Date, end?: Date): string => {
  const startString = start
    ? dayjs(start).format(DateFormats.DisplayDate)
    : dayjs().format(DateFormats.DisplayDate);
  const endString = end
    ? dayjs(end).format(DateFormats.DisplayDate)
    : dayjs().format(DateFormats.DisplayDate);
  return `${startString}  -  ${endString}`;
};

export default function Analytics() {
  const { user } = useContext(UserContext);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [finalDate, setFinalDate] = useState<string>(getDisplayDate());
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const onDatesUpdate = async () => {
    setFinalDate(getDisplayDate(dateRange[0].startDate, dateRange[0].endDate));
    onClose();
  };
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
          <Button
            w={"full"}
            rightIcon={<AiOutlineCalendar />}
            onClick={onOpen}
            variant="outline"
          >
            {finalDate}
          </Button>
          <GenericDialog
            onConfirm={onDatesUpdate}
            isOpen={isOpen}
            onClose={onClose}
          >
            <DateRange
              showDateDisplay={false}
              editableDateInputs={true}
              /* @ts-ignore */
              onChange={(item) => setDateRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
            />
          </GenericDialog>
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
