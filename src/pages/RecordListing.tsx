import * as React from "react";
import { useContext, useEffect, useState } from "react";
import {
  DateRangeType,
  FormattedRecordsResponse,
  RecordData,
  RecordsTableData,
} from "../types/misc.types";
import { UserContext } from "../components/user-context";
import { getRecordsTrackInfo } from "../api/misc.api";
import { getDisplayDate, getFormattedRecords } from "../utils/misc.utils";
import useLoaderHook from "../hooks/useLoaderHook";
import { useMediaQuery } from "@mui/material";
import RecordsTable, { BigRecordsTable } from "../components/records-table";
import { DateFormats } from "../types/enums";
import dayjs from "dayjs";
import { Checkbox, useDisclosure, useToast } from "@chakra-ui/react";
import useDateFilterFetch from "../hooks/useDateFilterFetch";
import DateFilter from '../components/date-filter'

export interface RecordListingProps {}

export const RecordListing = (props: RecordListingProps) => {
  const [records, setRecords] = useState<RecordData[]>([]);
  const isLargerThan800 = useMediaQuery("(min-width:800px)");
  const { isLoading, setIsLoading, wrapperBhai } = useLoaderHook();
  const { user } = useContext(UserContext);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { dateRange, setDateRange, getFilteredRecords } = useDateFilterFetch({
    uid: user?.uid,
  });
  const toast = useToast();
  const visitedPages = React.useRef<Set<number>>(new Set([1]));
  const [totalUnfilteredCount, setTotalUnfilteredCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setPage] = useState(1);
  const [isFilterOn, setIsFilterOn] = useState(false);
  // setting last record since firebase actually needs the exact same document for querying
  const [lastRecord, setLastRecord] = useState<any>(undefined);

  const getAndSaveRecords = React.useCallback(async (): Promise<void> => {
    const { lastVisibleRecord, data }: FormattedRecordsResponse =
      await getFormattedRecords(user.uid);
    setLastRecord(lastVisibleRecord);
    setRecords(data);
  },[user?.uid])

  useEffect(() => {
    const getTotalCount = async (): Promise<number> => {
      const recordsSnap = await getRecordsTrackInfo(user?.uid);
      const recordsCount = recordsSnap.data()?.recordsCount ?? 0;
      setTotalUnfilteredCount(recordsSnap.data()?.recordsCount ?? 0);
      setTotalCount(recordsSnap.data()?.recordsCount ?? 0);
      return recordsCount;
    };
    setIsLoading(true);
    if (user?.uid) {
      getTotalCount().then(() => {
        getAndSaveRecords()
          .then(() => {})
          .finally(() => {
            setIsLoading(false);
          });
      });
    }
  }, [user?.uid, getAndSaveRecords, setIsLoading]);

  const formatRecords = (records: RecordData[]): RecordsTableData[] => {
    return records.map((record) => ({
      ...record,
      date: dayjs(record.date).format(DateFormats.ListingDisplay),
      amount: `Nu. ${
        !Number.isNaN(+record.amount)
          ? (+record.amount).toLocaleString()
          : record.amount
      }`,
      phoneNumber: record.phoneNumber.toString(),
    }));
  };

  const handlePageChange = async (
    _: React.MouseEvent,
    page: number
  ): Promise<void> => {
    try {
      setIsLoading(true);
      setPage(page);
      if (user?.uid && !visitedPages.current.has(page)) {
        if (!isFilterOn) {
          const { lastVisibleRecord, data }: FormattedRecordsResponse =
            await getFormattedRecords(user.uid, 10, lastRecord);
          setLastRecord(lastVisibleRecord);
          setRecords((records) => [...records, ...data]);
        }
        visitedPages.current.add(page);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const queryFilteredRecords = async (startDate: Date, endDate: Date) => {
    const result = await getFilteredRecords(
      dayjs(startDate).startOf("D").toDate(),
      dayjs(endDate).endOf("D").toDate()
    );
    if (result) {
      setRecords(result.data as RecordData[]);
      setTotalCount(result.data.length);
    }
  };

  const onFiltration = async (dateRange: DateRangeType) => {
    setIsFilterOn(true);
    setDateRange(dateRange);
    setPage(1);
    queryFilteredRecords(dateRange.startDate, dateRange.endDate);
    visitedPages.current = new Set([1]);
    onClose();
  };

  const handleCheckBoxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterStatus = !!e.target.checked;
    if (filterStatus) {
      let wrapped = wrapperBhai(onFiltration);
      await wrapped(dateRange);
    } else {
      getAndSaveRecords();
      setTotalCount(totalUnfilteredCount);
      setPage(1);
      visitedPages.current= new Set([1]);
    }
    setIsFilterOn(filterStatus);
  }

  return (
    <>
      <DateFilter
        onButtonClick={onOpen}
        displayValue={getDisplayDate(dateRange.startDate, dateRange.endDate)}
        onConfirm={onFiltration}
        isOpen={isOpen}
        onClose={onClose}
      >
        <Checkbox
          isChecked={isFilterOn}
          onChange={handleCheckBoxChange}
          size="lg"
          colorScheme="orange"
          borderColor="orange"
          ml="10px"
          mr="20px"
        />
      </DateFilter>
      {isLargerThan800 ? (
        <BigRecordsTable
          handlePageChange={handlePageChange}
          data={formatRecords(records)}
          isLoading={isLoading}
          currentPage={currentPage}
          count={totalCount}
        />
      ) : (
        <RecordsTable
          data={formatRecords(records)}
          currentPage={currentPage}
          isLoading={isLoading}
          count={totalCount}
          handlePageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default RecordListing;
