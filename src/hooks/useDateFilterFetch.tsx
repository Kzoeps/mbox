import { useState } from "react";
import { INIT_DATE_RANGE } from "../constants/misc.constants";
import { queryRecordsByDate } from "../api/misc.api";
import { compileRecordsData, formatRecords } from "../utils/misc.utils";
import { RecordsTableData } from "../types/misc.types";

interface DateFilterProps {
  uid: string | undefined;
}
export default function useDateFilterFetch(props: DateFilterProps) {
  const { uid } = props;
  const [dateRange, setDateRange] = useState({ ...INIT_DATE_RANGE });
  const getFilteredRecords = async (startDate: Date, endDate: Date) => {
    if (uid) {
      const snapshot = await queryRecordsByDate(startDate, endDate, uid);
      return formatRecords(compileRecordsData(snapshot));
    }
  };
  return {
    setDateRange,
    getFilteredRecords,
    dateRange,
  };
}
