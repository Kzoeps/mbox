import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {Record, TableIds} from '../types/misc.types';
import dayjs from 'dayjs';
import {useContext, useEffect, useState} from 'react';
import {UserContext} from '../components/user-context';
import {getRecords} from '../api/misc.api';

export interface RecordListingProps {
}


interface Column {
	id: TableIds;
	label: string;
	minWidth?: number;
	align?: 'right';
	format?: (value:Date) => string;
}

const columns: readonly Column[] = [
	{id: 'jrnlNo', label: 'Journal number', minWidth: 170},
	{id: 'amount', label: 'Amount', minWidth: 100},
	{
		id: 'phoneNumber',
		label: 'Phone number',
		minWidth: 170,
		align: 'right',
	},
	{
		id: 'remarks',
		label: 'Remarks',
		minWidth: 170,
		align: 'right',
	},
	{
		id: 'date',
		label: 'Date',
		minWidth: 170,
		align: 'right',
		format: (value: Date) => dayjs(value).format(`YYYY-MM-DD`)
	}
];

interface Data {
	id: string;
	jrnlNo: string;
	amount: string;
	phoneNumber: number;
	remarks: number;
	date: Date;
}

function createData(record: Record): any {
}

const rows: Data[] = [
];

export function StickyHeadTable() {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper sx={{width: '100%', overflow: 'hidden'}}>
			<TableContainer sx={{maxHeight: 440}}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{minWidth: column.minWidth}}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
										{columns.map((column) => {
											const value = row[column.id];
											return (
												<TableCell key={column.id} align={column.align}>
													{column.format && value instanceof Date
														? (column.format(value as Date))
														: value as string}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}

export const RecordListing = (props: RecordListingProps) => {
	const [records, setRecords] = useState<Data[]>([]);
	const {user} = useContext(UserContext);
	useEffect(() => {
		const getAndSaveRecords = async () => {
			if (user?.email) {
				const recordsSnapshot = await getRecords(user.email);
				const datas: Data[] = [];
				recordsSnapshot.forEach((doc) => {
					const data = {id: doc.id, ...doc.data(), date:doc?.data()?.date?.toDate()};
					datas.push(data as Data);
				});
				setRecords(datas);
			}
		}
		getAndSaveRecords();
	},[user?.email])
	return (
		<>
			<StickyHeadTable/>
		</>
	);
};

export default RecordListing;
