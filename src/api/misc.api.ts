import {Record, TrialProfile} from '../types/misc.types';
import {addDoc, collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc, startAfter} from 'firebase/firestore';
import {db} from '../firebase.config';
import dayjs from 'dayjs';

export const addRecord = async (userEmail: string, record: Record) => {
	const response = await addDoc(collection(db, userEmail), record);
	return response;
};

export const addPayment = async (userEmail: string, record: Record & {name: string}) => {
	const time_stamp= dayjs().toISOString()
	const time_stamp_date = dayjs().toDate()
	return await setDoc(doc(db, "payments", `${userEmail}_${time_stamp}`), {...record, email: userEmail, time_stamp_date})
}

export const getRecords = async (email: string, cap: number = 10, lastDoc?: any) => {
	const queryRecords = lastDoc ? query(collection(db,email), limit(cap), orderBy("date", "desc"),startAfter(lastDoc)) : query(collection(db,email), limit(cap), orderBy("date", "desc"));
	return await getDocs(queryRecords);
}

export const getRecordsTrackInfo = async (uid: string) => {
	const docRef = doc(db, "records_info", uid);
	return await getDoc(docRef)
}

export const increaseRecordNumber = async (email: string ,recordsCount: number) => {
	const recordsRef = doc(db, "records_info", email);
	setDoc(recordsRef, { recordsCount }, {merge:true});
}

export const updateUserProfile = async (uid: string, profileData: TrialProfile) => {
	const recordsRef = doc(db, 'user_profiles', uid);
	await setDoc(recordsRef, profileData, {merge: true})
}
