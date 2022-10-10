import {NavItem, RecordsColumn} from '../types/misc.types';
import dayjs from 'dayjs';

export const RECORDS_COLUMNS: readonly RecordsColumn[] = [
	{id: 'journalNumber', label: 'Journal number', minWidth: 170},
	{id: 'amount', label: 'Amount', minWidth: 100},
	{
		id: 'phoneNumber',
		label: 'Phone number',
		minWidth: 170,
		align: 'right'
	},
	{
		id: 'remarks',
		label: 'Remarks',
		minWidth: 170,
		align: 'right'
	},
	{
		id: 'date',
		label: 'Date',
		minWidth: 170,
		align: 'right',
		format: (value: Date) => dayjs(value).format(`YYYY-MM-DD`)
	}
];

export const AUTHENTICATED_NAV_ITEMS: NavItem[] = [{
	label: 'Dashboard',
	href: '/dashboard'
},
	{
		label: 'View Records',
		href: `/records`
	},
	{
		label: 'Add Record',
		href: '/add-record'
	}];

export const IMAGE_COMPRESSION_OPTIONS = {
	maxSizeMB: 0.1,
	maxWidthOrHeight: 1200,
	useWebWorker: false
}
