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
import dayjs from "dayjs";
import GenericDialog from "../components/generic-dialog";
import { DateFormats } from "../types/enums";
import { AiOutlineCalendar } from "react-icons/ai";
import { queryRecordsByDate } from "../api/misc.api";
import { extractAnalytics } from "../utils/misc.utils";
import { Analytics as AnalyticsRecord } from "../types/misc.types";
import MboxSpinner from "../components/spinner";
import useLoaderHook from "../hooks/useLoaderHook";

const getDisplayDate = (start?: Date, end?: Date): string => {
  const startString = start
    ? dayjs(start).format(DateFormats.DisplayDate)
    : dayjs().format(DateFormats.DisplayDate);
  const endString = end
    ? dayjs(end).format(DateFormats.DisplayDate)
    : dayjs().format(DateFormats.DisplayDate);
  return `${startString}  -  ${endString}`;
};

const getDateRange = (start: Date, end: Date): string => {
  return `${dayjs(start).format(DateFormats.BoxDateDisplay)} -- ${dayjs(
    end
  ).format(DateFormats.BoxDateDisplay)}`;
};

export default function Analytics() {
  const { user } = useContext(UserContext);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const initDateRange = {
    startDate: dayjs().startOf("D").toDate(),
    endDate: new Date(),
    key: "selection",
  };
  const { wrapperBhai, isLoading } = useLoaderHook();
  const [analytics, setAnalytics] = useState<AnalyticsRecord>();
  const [finalDate, setFinalDate] = useState(initDateRange);
  const [dateRange, setDateRange] = useState([initDateRange]);

  const onDatesUpdate = async () => {
    setFinalDate(dateRange[0]);
    onClose();
  };
  useEffect(() => {
    if (user?.uid) {
      const setMeta = async () => {
        const snapshot = await queryRecordsByDate(
          finalDate.startDate,
          finalDate.endDate,
          user?.uid
        );
        setAnalytics(extractAnalytics(snapshot));
      };
      const wrapped = wrapperBhai(setMeta);
      wrapped();
    }
  }, [user?.uid, wrapperBhai, finalDate]);

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
            {getDisplayDate(finalDate.startDate, finalDate.endDate)}
          </Button>
          <GenericDialog
            onConfirm={onDatesUpdate}
            isOpen={isOpen}
            onClose={onClose}
          >
            <DateRange
              maxDate={new Date()}
              showDateDisplay={false}
              editableDateInputs={true}
              /* @ts-ignore */
              onChange={(item) => setDateRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
            />
          </GenericDialog>
        </Box>
        {isLoading ? (
          <>
            <MboxSpinner />
          </>
        ) : (
          <>
            <AnalyticCard
              title="Total transaction amount"
              amount={`Nu. ${
                analytics?.totalAmount?.toLocaleString("en-US") || 0
              }`}
              date={getDateRange(finalDate.startDate, finalDate.endDate)}
            >
              <FcMoneyTransfer size="2em" color="orange" />
            </AnalyticCard>
            <AnalyticCard
              title="Number of transactions"
              amount={`${analytics?.totalTransactions || 0}`}
              date={getDateRange(finalDate.startDate, finalDate.endDate)}
            >
              <RiExchangeBoxLine size="2em" color="orange" />
            </AnalyticCard>
            <AnalyticCard
              title="Highest transaction amount"
              amount={`Nu. ${analytics?.highestTransaction?.amount || 0}`}
              date={`${dayjs(analytics?.highestTransaction?.date).format(
                DateFormats.BoxDateDisplay
              )}`}
            >
              <IoPricetagsOutline size="2em" color="orange" />
            </AnalyticCard>
          </>
        )}
      </Box>
    </>
  );
}
