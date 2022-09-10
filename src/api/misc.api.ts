import {Record} from '../types/misc.types';
import { setDoc, addDoc, collection, doc, getDoc, getDocs, query} from 'firebase/firestore';
import {db} from '../firebase.config';

export const addRecord = async (userEmail: string, record: Record) => {
	const response = await addDoc(collection(db, userEmail), record);
	return response;
};

export const getRecords = async (email: string) => {
	const queryRecords = query(collection(db,email));
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
