import { QuerySnapshot } from "@firebase/firestore-types";
import { getRecords } from "../api/misc.api";
import {
  Analytics,
  ExtractedOCRData,
  MboxRecord,
  RecordsTableData,
  SegregatedDateTime,
  TrialProfile,
  VisionOCRData,
  WithId,
} from "../types/misc.types";
import dayjs, { Dayjs } from "dayjs";
import { findBestMatch } from "string-similarity";
import {
  BNBPrimaryInfo,
  BankIdentifier,
  DateFormats,
  PrimaryInfo,
} from "../types/enums";
import { BANK_IDENTIFIERS } from "../constants/misc.constants";

const datifyRecords = (records: any[]) => {
  return records.map((record) => ({
    ...record,
    date: record?.date?.toDate(),
  }));
};

export const numberFi = (num: number | string) => {
  if (isNaN(+num)) return 0;
  return +num;
};

export const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result;
      // @ts-ignore
      resolve(encoded.toString().replace(/^data:(.*,)?/, ""));
    };
    reader.onerror = (error) => reject(error);
  });

const arrayifyRecords = (recordsSnapshot: QuerySnapshot<any>): any[] => {
  const formattedData: any[] = [];
  recordsSnapshot.forEach((doc) => {
    formattedData.push({ id: doc.id, ...doc.data() });
  });
  return formattedData;
};

export const getFormattedRecords = async (
  email: string,
  limit?: number,
  lastRecord?: any
) => {
  const recordsSnapshot = await getRecords(email, limit, lastRecord);
  const lastVisibleRecord =
    recordsSnapshot.docs[recordsSnapshot.docs.length - 1];
  return {
    lastVisibleRecord,
    data: datifyRecords(arrayifyRecords(recordsSnapshot as unknown as any)),
  };
};

export const getTrialDates = (): Pick<
  TrialProfile,
  "start_date" | "expiry_date"
> => {
  const start_date = dayjs();
  const expiry_date = dayjs().add(3, "day");
  return {
    start_date: start_date.toDate(),
    expiry_date: expiry_date.toDate(),
  };
};

export const formatPhoneNumber = (number: string): string => {
  if (number.startsWith("+975")) {
    return number.trim();
  } else if (number.startsWith("975")) {
    return `+${number.trim()}`;
  } else {
    return `+975${number.trim()}`;
  }
};

export const dateConversion = (
  dateTime: SegregatedDateTime
): Dayjs | undefined => {
  const { date, time } = dateTime;
  if (date) {
    let dateAndTime = dayjs(`${date} ${time}`, DateFormats.Date);
    dateAndTime = dateAndTime.isValid()
      ? dateAndTime
      : dayjs(`${date}`, DateFormats.Date);
    return dateAndTime.isValid() ? dateAndTime : undefined;
  }
  return;
};

export const getStringiDate = (date: Dayjs | undefined): string => {
  return date
    ? date.format(DateFormats.CalendarDate)
    : dayjs().format(DateFormats.CalendarDate);
};

export const getAmount = (amount: string): string => {
  return +amount ? `Nu. ${numberFi(amount).toLocaleString()}` : amount;
};

export const formatRecords = (
  records: WithId<MboxRecord>[]
): RecordsTableData[] => {
  return records.map((record) => {
    return {
      ...record,
      amount: `Nu. ${numberFi(record.amount)}`,
      date: dayjs(record.date).format(DateFormats.CalendarDate),
    };
  }) as RecordsTableData[];
};

export const compileRecordsData = (snapshot: any): WithId<MboxRecord>[] => {
  const records: WithId<MboxRecord>[] = [];
  snapshot.forEach((doc: any) => {
    let record = {
      id: doc.id,
      ...doc.data(),
    };
    record.date = record.date.toDate();
    records.push(record);
  });
  return records;
};

export const extractAnalytics = (snapshot: any): Analytics => {
  const records = compileRecordsData(snapshot);
  const totalAmount = records.reduce(
    (accumulator, record) => numberFi(record.amount) + accumulator,
    0
  );
  const totalTransactions = records.length;
  const amounts = records.map(({ amount }) => numberFi(amount));
  // get the records of highest transaction by first getting the max and then index of max and finally the record itself
  const highestTransaction =
    records[amounts.indexOf(Math.max.apply(null, amounts))];
  return { highestTransaction, totalTransactions, totalAmount };
};

export const getDisplayDate = (start?: Date, end?: Date): string => {
  const startString = start
    ? dayjs(start).format(DateFormats.DisplayDate)
    : dayjs().format(DateFormats.DisplayDate);
  const endString = end
    ? dayjs(end).format(DateFormats.DisplayDate)
    : dayjs().format(DateFormats.DisplayDate);
  return `${startString}  -  ${endString}`;
};
