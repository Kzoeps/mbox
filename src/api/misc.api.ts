import { MboxRecord, TrialProfile } from "../types/misc.types";
import {getStorage, ref, uploadString} from "firebase/storage"
import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toBase64 } from "../utils/misc.utils";
import axios from "axios";
import dayjs from "dayjs";

export const getTotalRecords = async (uid: string): Promise<number> => {
  const collectionRef = collection(db, uid);
  const snapshot = await getCountFromServer(collectionRef);
  return snapshot.data().count || 0
}

export const uploadCrash = async (image: string) => {
  const storage = getStorage();
  const storageRef = ref(storage,`crash/${crypto.randomUUID()}`);
  uploadString(storageRef, image.toString().replace( /^data:(.*,)?/, ""),'base64')
}

export const readScreenShot = async (image: File, token: string) => {
  const base64 = await toBase64(image);
  return await extractText(base64, token);
};

export const extractText = async (image: string, token: string) => {
  const text = await axios.post(`/api/ocr`, { token, image: image.toString().replace( /^data:(.*,)?/, "") });
  return text.data
}

export const addRecord = async (userEmail: string, record: MboxRecord) => {
  const response = await addDoc(collection(db, userEmail), record);
  return response;
};

export const addPayment = async (
  userId: string,
  record: MboxRecord & { name: string }
) => {
  const time_stamp = dayjs().toISOString();
  const time_stamp_date = dayjs().toDate();
  return await setDoc(doc(db, "payments", `${userId}_${time_stamp}`), {
    ...record,
    uid: userId,
    time_stamp_date,
  });
};

export const getRecords = async (
  email: string,
  cap: number = 10,
  lastDoc?: any
) => {
  const queryRecords = lastDoc
    ? query(
        collection(db, email),
        limit(cap),
        orderBy("date", "desc"),
        startAfter(lastDoc)
      )
    : query(collection(db, email), limit(cap), orderBy("date", "desc"));
  return await getDocs(queryRecords);
};

export const getRecordsTrackInfo = async (uid: string) => {
  const docRef = doc(db, "records_info", uid);
  return await getDoc(docRef);
};

export const increaseRecordNumber = async (
  email: string,
  recordsCount: number
) => {
  const recordsRef = doc(db, "records_info", email);
  setDoc(recordsRef, { recordsCount }, { merge: true });
};

export const updateUserProfile = async (
  uid: string,
  profileData: TrialProfile
) => {
  const recordsRef = doc(db, "user_profiles", uid);
  await setDoc(recordsRef, profileData, { merge: true });
};

export const getPaymentInfo = async (uid: string) => {
  const docRef = doc(db, "user_profiles", uid);
  return await getDoc(docRef);
};

export const queryRecordsByDate = async (start: Date, endDate: Date, uid: string, cap?: number, lastDoc?: any) => {
  const recordsRef = collection(db, uid);
  const recordsQuery = getRecordsQuery(recordsRef, start, endDate, cap, lastDoc); 
  return await getDocs(recordsQuery);
}

const getRecordsQuery = (ref: any, start: Date, end: Date, cap?: number, lastDoc?: any) => {
  if (cap != null && !!lastDoc) {
    return query(ref, where('date', '>=', start), where('date', '<=', end), limit(cap), startAfter(lastDoc), orderBy('date', 'desc'));
  } else if (cap == null && !lastDoc) {
    return query(ref, where('date', '>=', start), where('date', '<=', end), orderBy('date', 'desc'));
  } else if  (cap != null && !lastDoc) {
    return query(ref, where('date', '>=', start), where('date', '<=', end), limit(cap), orderBy('date', 'desc'));
  } else {
    return query(ref, where('date', '>=', start), where('date', '<=', end), startAfter(lastDoc), orderBy('date', 'desc'));
  }
}
/*
export const getTodaysTotal = async (date: Dayjs, uid: string) => {
  const docRef = doc(
    db,
    uid,
    "Analytics",
    date.year().toString(),
    date.format(DateFormats.CalendarDate)
  );
  return await getDoc(docRef);
};
export const getThisMonthsTotal = async (date: Dayjs, uid: string) => {
	const docRef = doc(db, uid, "Analytics", date.year().toString(), date.month().toString());
	return await getDoc(docRef);
}

export const updateTodaysTotal =async (date:Dayjs, uid: string, data: Partial<AnalyticsRecord>) => {
	const docRef = doc(db, uid, 'Analytics', date.year().toString(), date.format(DateFormats.CalendarDate));
	await setDoc(docRef, data, {merge:true})
}
*/
