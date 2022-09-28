import { object, string, date } from 'yup';

export const FirebaseErrorCodesMessages: Record<string, string> = {
	'auth/email-already-in-use': 'Email is already in use by another account',
	'auth/weak-password': 'Password is too weak',
	'auth/wrong-password': 'Either your password or email is incorrect',
	'auth/user-not-found': 'User does not exist'
}


export const RecordEntrySchema = object().shape({
	journalNumber: string().required(),
	amount: string().required(),
	remarks: string(),
	phoneNumber: string().matches(/^[1|7][7]\d{6}$/),
	date: date().required()
})
