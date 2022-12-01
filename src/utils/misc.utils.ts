import {QuerySnapshot} from '@firebase/firestore-types';
import {getRecords} from '../api/misc.api';
import {TrialProfile} from '../types/misc.types';
import dayjs from 'dayjs';

const datifyRecords = (records: any[]) => {
	return records.map((record) => ({
		...record,
		date: record?.date?.toDate()
	}));
};

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

export const getTrialDates = (): TrialProfile => {
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
