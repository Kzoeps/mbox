import {QuerySnapshot} from '@firebase/firestore-types';
import {getRecords} from '../api/misc.api';

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
	const recordsSnapshot = await getRecords(email);
	return (datifyRecords(arrayifyRecords(recordsSnapshot as unknown as any)));
};
