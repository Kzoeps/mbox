import {NumString} from '../utils/util.types';

export interface ExtractedOCRData {
  amount: string | undefined,
  remarks: string | undefined,
  journalNumber: string | undefined
}

export interface BaseRecordInfo {
  amount: string,
  journalNumber: string,
  remarks: string
}

export interface MboxRecord {
	journalNumber: NumString,
	amount: NumString,
	remarks: string,
	phoneNumber: NumString,
	date: string | Date
}

export type TableIds = 'journalNumber' | 'amount' | 'phoneNumber' | 'remarks' | 'date';

export interface RecordsColumn {
	id: TableIds;
	label: string;
	minWidth?: number;
	align?: 'right';
	format?: (value: Date) => string;
}

export interface RecordData extends BaseRecordInfo {
	id: string;
	phoneNumber: number;
	date: Date;
}

export interface NavItem {
	label: string;
	subLabel?: string;
	children?: Array<NavItem>;
	href?: string;
}

export interface StickyHeadTableProps {
	handleChangePage: (page: number) => void;
	handleRowsChange: (rowsPerPage: number) => void;
	records: RecordData[];
	totalRecords: number;
	isLoadingData: boolean
}

export interface FormattedRecordsResponse {
	lastVisibleRecord: any;
	data: RecordData[];
}

export interface TrialProfile {
	start_date: Date,
	expiry_date: Date,
	phone_number: string,
	payment_valid_till?: Date
}

export interface SignUpBase {
	firstName: string,
	lastName: string
}

export interface PhoneSignUpForm extends SignUpBase{
	//has to be in the format of +97517123456
	phoneNumber: string,
	verificationCode: string
}

export interface VisionOCRData {
  detection?: (DetectionEntity)[] | null;
}
export interface DetectionEntity {
  locations?: (null)[] | null;
  properties?: (null)[] | null;
  mid: string;
  locale: string;
  description: string;
  score: number;
  confidence: number;
  topicality: number;
  boundingPoly: BoundingPoly;
}
export interface BoundingPoly {
  vertices?: (VerticesEntity)[] | null;
  normalizedVertices?: (null)[] | null;
}
export interface VerticesEntity {
  x: number;
  y: number;
}
