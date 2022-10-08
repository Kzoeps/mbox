import {NumString} from '../utils/util.types';

export interface Record {
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

export interface RecordData {
	id: string;
	journalNumber: string;
	amount: string;
	phoneNumber: number;
	remarks: number;
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
