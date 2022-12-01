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
export const LoginSchemaBase = {
	phoneNumber: string().required('Phone number is required').matches(/^(\+?975)?[1|7][7]\d{6}(\s+)?$/, 'Number must be in format 17/77 or +975 and 8 digits long'),
	verificationCode: string().required('Verification code is required').min(6, {min: '6 digits required'}).max(6, {max: '6 digits required'})
}

export const LoginSchema = object().shape(LoginSchemaBase)

export const SignUpSchema = object().shape({
	firstName: string().required('First name is required'),
	lastName: string().required('Last name is required'),
	...LoginSchemaBase,
})

export const InitSignUpSchema = object().shape({
	firstName: string().required('First name is required'),
	lastName: string().required('Last name is required'),
	phoneNumber: LoginSchemaBase['phoneNumber']
})
