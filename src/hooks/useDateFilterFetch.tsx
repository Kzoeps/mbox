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
  const getFilteredRecords = async (startDate: Date, endDate: Date, cap?: number, lastDoc?: any) => {
    if (uid) {
      const snapshot = await queryRecordsByDate(startDate, endDate, uid, cap , lastDoc);
      return {data: formatRecords(compileRecordsData(snapshot)), lastVisibleRecord: snapshot.docs.at(-1)};
    }
  };
  return {
    setDateRange,
    getFilteredRecords,
    dateRange,
  };
}
