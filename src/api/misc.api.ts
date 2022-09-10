import {Record} from '../types/misc.types';
import { startAfter, limit, setDoc, addDoc, collection, doc, getDoc, getDocs, query} from 'firebase/firestore';
import {db} from '../firebase.config';

export const addRecord = async (userEmail: string, record: Record) => {
	const response = await addDoc(collection(db, userEmail), record);
	return response;
};

export const getRecords = async (email: string, cap: number = 10, lastDoc?: any) => {
	const queryRecords = lastDoc ? query(collection(db,email), limit(cap), startAfter(lastDoc)) : query(collection(db,email), limit(cap));
	return await getDocs(queryRecords);
}

export const getRecordsTrackInfo = async (email: string) => {
	const docRef = doc(db, "records_info", email);
	return await getDoc(docRef)
}

export const increaseRecordNumber = async (email: string ,recordsCount: number) => {
	const recordsRef = doc(db, "records_info", email);
	setDoc(recordsRef, { recordsCount }, {merge:true});
}
