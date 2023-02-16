import {QuerySnapshot} from '@firebase/firestore-types';
import {getRecords} from '../api/misc.api';
import {ExtractedOCRData, TrialProfile, VisionOCRData} from '../types/misc.types';
import dayjs from 'dayjs';
import {findBestMatch} from 'string-similarity';
import { PrimaryInfo } from '../types/enums';


const datifyRecords = (records: any[]) => {
	return records.map((record) => ({
		...record,
		date: record?.date?.toDate()
	}));
};

export const toBase64 = (file: File) => new Promise((resolve, reject) => {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => { 
    let encoded = reader.result
    // @ts-ignore
    resolve(encoded.toString().replace(/^data:(.*,)?/, ''))
  };
	reader.onerror = error => reject(error);
})

const arrayifyRecords = (recordsSnapshot: QuerySnapshot<any>): any[] => {
	const formattedData: any[] = [];
	recordsSnapshot.forEach((doc) => {
		formattedData.push({id: doc.id, ...doc.data()});
	});
	return formattedData;
};

export const getFormattedRecords = async (email: string, limit?: number, lastRecord?: any) => {
	const recordsSnapshot = await getRecords(email, limit, lastRecord);
	const lastVisibleRecord = recordsSnapshot.docs[recordsSnapshot.docs.length - 1];
	return ({lastVisibleRecord, data: datifyRecords(arrayifyRecords(recordsSnapshot as unknown as any))});
};

export const getTrialDates = (): Pick<TrialProfile, 'start_date' | 'expiry_date'> => {
	const start_date = dayjs()
	const expiry_date = dayjs().add(3, 'day')
	return {
		start_date: start_date.toDate(),
		expiry_date: expiry_date.toDate()
	}
}

export const formatPhoneNumber = (number: string): string => {
	if (number.startsWith('+975')) {
		return number.trim()
	} else if (number.startsWith('975')) {
		return `+${number.trim()}`
	} else {
		return `+975${number.trim()}`
	}
}

export const extractOCRData = (data: VisionOCRData): ExtractedOCRData => {
  const textSummary = data?.detection?.[0]?.description?.split('\n') || []; 
  if (textSummary?.length) {
    return {
      amount: findAmount(textSummary),
      remarks: findRemark(textSummary),
      journalNumber: findJournalNumber(textSummary),
    }
  }
  return {
    amount: undefined,
    remarks: undefined,
    journalNumber: undefined
  } 

} 

const findRemark = (data: string[]): string | undefined => {
  const {bestMatchIndex} = findBestMatch(PrimaryInfo.Remark, data);
  if (data.length > bestMatchIndex + 1) {
    return data[bestMatchIndex+1];
  }
}

const findAmount = (data: string[]): string | undefined => {
  const {bestMatch: {target: bestMatch}} = findBestMatch(PrimaryInfo.Amount, data);
  const amountRegex = /\d+/g;
  if (bestMatch) {
    const amounts = bestMatch.match(amountRegex);
    if (amounts?.length) {
      return amounts[0]; 
    }
  }
  return undefined;
}

const findJournalNumber = (data: string[]): string | undefined => {
  const {bestMatchIndex} = findBestMatch(PrimaryInfo.Journal, data);
  const journalExpression = /\d{4,}/;
  if (data[bestMatchIndex+1] && journalExpression.test(data[bestMatchIndex+1])) {
    return data[bestMatchIndex+1]; 
  }
}

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
