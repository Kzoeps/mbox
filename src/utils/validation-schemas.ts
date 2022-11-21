import {date, object, string} from 'yup';

export const RecordEntrySchema = object().shape({
	journalNumber: string().required(),
	amount: string().required(),
	remarks: string(),
	phoneNumber: string().matches(/^[1|7][7]\d{6}$/, 'Number must be in format 17/77 and 8 digits long'),
	date: date().required()
})

export const PaymentEntrySchema = object().shape({
	name: string().required('Name is required'),
	journalNumber: string().required('Journal Number is required'),
	amount: string().required('Amount is required'),
	remarks: string(),
	phoneNumber: string().required('Phone number is required').matches(/^[1|7][7]\d{6}$/, 'Number must be in format 17/77 and 8 digits long'),
	date: date().required('Date is required')
})
