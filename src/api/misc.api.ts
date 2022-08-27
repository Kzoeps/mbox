import {Record} from '../types/misc.types';
import {addDoc, collection} from 'firebase/firestore';
import {db} from '../firebase.config';
import { query, getDocs } from 'firebase/firestore';

export const addRecord = async (userEmail: string, record: Record) => {
	const response = await addDoc(collection(db, userEmail), record);
	return response;
};

export const getRecords = async (email: string) => {
	const queryRecords = query(collection(db,email));
	return await getDocs(queryRecords);
}
