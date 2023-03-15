import React, { useState } from 'react'
import { INIT_DATE_RANGE } from '../constants/misc.constants';
import { queryRecordsByDate } from '../api/misc.api';

interface DateFilterProps {
    uid: string
}
export default function useDateFilterFetch(props: DateFilterProps) {
    const {uid} = props;
    const [dateRange, setDateRange] = useState({...INIT_DATE_RANGE});
    const [records, setRecords] = useState([]);
    const setFilteredRecords = async () => {
        const snapshot = await queryRecordsByDate(dateRange.startDate, dateRange.endDate, uid);
    }
  return (
    {}
  )
}
