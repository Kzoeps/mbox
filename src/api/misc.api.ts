import {Record} from '../types/misc.types';
import {addDoc, collection} from 'firebase/firestore';
import {db} from '../firebase.config';

export const addRecord = async (userEmail: string, record: Record) => {
	const response = await addDoc(collection(db, userEmail), record);
	return response;
};
