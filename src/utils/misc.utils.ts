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

export const cleanOCRData = (data: string[]): string[] => {
  return data.map((item) => item.toLowerCase().trim());
};

export const detectBank = (data: string[]): BankIdentifier => {
  const matchRatings = BANK_IDENTIFIERS.map((bank) => {
    const { bestMatch } = findBestMatch(bank, data);
    return bestMatch.rating;
  });
  const maxRating = Math.max(...matchRatings);
  return BANK_IDENTIFIERS[matchRatings.indexOf(maxRating)];
};

// so we delete the reference and no text and then try and find the alphanumeric id
export const extractBNBTxnId = (data: string[]): string => {
  const { bestMatch } = findBestMatch(BNBPrimaryInfo.Journal, data);
  let divvied = bestMatch.target.split(" ");
  const { bestMatch: reference, bestMatchIndex: referenceIndex } =
    findBestMatch("reference", divvied);
  if (reference.rating > 0.5) {
    divvied.splice(referenceIndex, 1);
  }
  // try and find no and delete that as well
  const { bestMatch: no, bestMatchIndex: noIndex } = findBestMatch(
    "no",
    divvied
  );
  if (no.rating > 0.5 && no.target.length <= 4) {
    divvied.splice(noIndex, 1);
  }
  const containsAlphNumber = /^(?=.*[a-zA-Z])(?=.*[0-9])[\w\d]{6,}/;
  const txnId = divvied.find((item) => containsAlphNumber.test(item));
  if (txnId) {
    return txnId.toUpperCase();
  }
  return "";
};

export const extractOCRData = (data: VisionOCRData): ExtractedOCRData => {
  const textSummary = data?.detection?.[0]?.description?.split("\n") || [];
  if (textSummary?.length) {
    return {
      amount: findAmount(textSummary),
      remarks: findRemark(textSummary),
      journalNumber: findJournalNumber(textSummary),
      date: getStringiDate(dateConversion(findDate(textSummary))),
    };
  }
  return {
    amount: undefined,
    remarks: undefined,
    journalNumber: undefined,
    date: dayjs().format(DateFormats.CalendarDate),
  };
};

const findRemark = (data: string[]): string | undefined => {
  const { bestMatchIndex } = findBestMatch(PrimaryInfo.Remark, data);
  if (data.length > bestMatchIndex + 1) {
    return data[bestMatchIndex + 1];
  }
};

const findAmount = (data: string[]): string | undefined => {
  let {
    bestMatch: { target: bestMatch },
  } = findBestMatch(PrimaryInfo.Amount, data);
  const amountRegex = /\d+/g;
  if (bestMatch) {
    // to remove commas from large numbers such as Nu. 18,230
    bestMatch = bestMatch.replace(/(\d)(,)(\d)/, "$1$3");
    const amounts = bestMatch.match(amountRegex);
    if (amounts?.length) {
      return amounts[0];
    }
  }
  return undefined;
};

const findJournalNumber = (data: string[]): string | undefined => {
  const { bestMatchIndex } = findBestMatch(PrimaryInfo.Journal, data);
  const journalExpression = /\d{4,}/;
  if (
    data[bestMatchIndex + 1] &&
    journalExpression.test(data[bestMatchIndex + 1])
  ) {
    return data[bestMatchIndex + 1];
  }
};

export const findDate = (data: string[]): SegregatedDateTime => {
  const dateTime: SegregatedDateTime = {
    date: undefined,
    time: undefined,
  };
  const { bestMatchIndex } = findBestMatch(PrimaryInfo.Date, data);
  const dateExpression =
    /(\d{1,2}?\s+[a-zA-z]{3,4}\s+\d{4})\s+(\d{2}:?\d{2}:?\d{0,2})?/g;
  const dateMatch = data[bestMatchIndex + 1];
  if (dateMatch) {
    const matches = Array.from(dateMatch.matchAll(dateExpression));
    dateTime.date = matches?.[0]?.[1];
    dateTime.time = matches?.[0]?.[2];
  }
  return dateTime;
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

/*
* FROM PREVIOUS TRIALS OF TRYING TO FIND INFO 
* 	const findJournalNumber = (data: string[], journalIndex: number) => {
		const possibilities: { value: NumString, distance: number }[] = [];
		data.forEach((piece, index) => {
			if (!isNaN(+piece)) {
				possibilities.push({
					value: piece,
					distance: Math.abs(journalIndex - index)
				});
			}
		});
		if (!possibilities.length) {
			return data[journalIndex + 1];
		}
		return possibilities.sort(({distance: firstDistance}, {distance: secondDistance}) => {
			if (firstDistance > secondDistance) {
				return 1;
			} else if (firstDistance < secondDistance) {
				return -1;
			} else {
				return 0;
			}
		})[0].value;
	};
const findRelevantInfo = (data: string[]): { journalNumber: NumString, cost: string } => {
		const searcher = new Fuse(data);
		const result = searcher.search('Jrnl');
		const queriedResult = result[0]?.refIndex || 0;
		const journalNumber = findJournalNumber(data, queriedResult);
		let cost = searcher.search('Nu.')?.[0]?.item;
		if (cost) {
			const justCost = cost.split(' ')?.[1];
			cost = justCost ?? cost;
		}
		return {journalNumber, cost};
	};
				const formData = new FormData();
				formData.append('file', compressedFile);
				const response = await fetch('https://api.mbox.kongtsey.com/', {method: 'POST', body: formData});
				const data = await response.json();
*/
