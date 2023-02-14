import {QuerySnapshot} from '@firebase/firestore-types';
import {getRecords} from '../api/misc.api';
import {OCRRecord, PrettyOCRData, TrialProfile} from '../types/misc.types';
import dayjs from 'dayjs';
import Fuse from 'fuse.js';


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

export const prettyFormatOCRData = (data: OCRRecord): PrettyOCRData => {
	const prettyData: PrettyOCRData = [] 
	data.regions.forEach((region) => {
		const regionData: any = {};
		region.lines.forEach((line, index) => {
			regionData[index] = line.words.map((word) => word.text); 
		})
		prettyData.push(regionData)
	})
	return prettyData
}

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

export const getRelevantInfo = (data: PrettyOCRData) => {
	let words: string[] = []
	data.forEach((region) => {
		Object.keys(region).forEach((line) => {
			words = [...words, ...region[+line]]
		})
	})
	const searcher = new Fuse(words);
	console.log(words);
	console.log(searcher.search('Nu'))

}
