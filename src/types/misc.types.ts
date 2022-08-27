import {NumString} from '../utils/util.types';
import {Dayjs} from 'dayjs';

export interface Record {
	journalNumber: NumString,
	amount: NumString,
	remarks: string,
	phoneNumber: NumString,
	date: string | Date
}

export type TableIds = 'jrnlNo' | 'amount' | 'phoneNumber' | 'remarks' | 'date';
