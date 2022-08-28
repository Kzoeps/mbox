import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {RecordData} from '../types/misc.types';
import {UserContext} from '../components/user-context';
import {getRecords} from '../api/misc.api';
import {RECORDS_COLUMNS} from '../constants/misc.constants';

export interface RecordListingProps {
}

export function StickyHeadTable(props: { records: RecordData[] }) {
	const {records} = props;
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
							{RECORDS_COLUMNS.map((column) => (
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
						{records
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
										{RECORDS_COLUMNS.map((column) => {
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
				count={records.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}

export const RecordListing = (props: RecordListingProps) => {
	const [records, setRecords] = useState<RecordData[]>([]);
	const {user} = useContext(UserContext);
	useEffect(() => {
		const getAndSaveRecords = async () => {
			if (user?.email) {
				const recordsSnapshot = await getRecords(user.email);
				const datas: RecordData[] = [];
				recordsSnapshot.forEach((doc) => {
					const data = {id: doc.id, ...doc.data(), date:doc?.data()?.date?.toDate()};
					datas.push(data as RecordData);
				});
				setRecords(datas);
			}
		}
		getAndSaveRecords();
	},[user?.email])
	return (
		<>
			<StickyHeadTable records={records}/>
		</>
	);
};

export default RecordListing;
