import { useContext, useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import AnalyticCard from "../components/analytic-card";
import { Box, useDisclosure } from "@chakra-ui/react";
import { FcMoneyTransfer } from "react-icons/fc";
import { RiExchangeBoxLine } from "react-icons/ri";
import { IoPricetagsOutline } from "react-icons/io5";
import { UserContext } from "../components/user-context";
import dayjs from "dayjs";
import { DateFormats } from "../types/enums";
import { queryRecordsByDate } from "../api/misc.api";
import { extractAnalytics } from "../utils/misc.utils";
import { Analytics as AnalyticsRecord, DateRangeType } from "../types/misc.types";
import MboxSpinner from "../components/spinner";
import useLoaderHook from "../hooks/useLoaderHook";
import DateFilter, { getDisplayDate } from "../components/date-filter";

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

  const onDatesUpdate = async (range: DateRangeType) => {
    setFinalDate(range);
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
        <DateFilter displayValue={getDisplayDate(finalDate.startDate, finalDate.endDate)} onButtonClick={onOpen} onConfirm={onDatesUpdate} onClose={onClose} isOpen={isOpen}/>
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
