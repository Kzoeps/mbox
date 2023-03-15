import * as React from "react";
import { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  FormattedRecordsResponse,
  RecordData,
  RecordsTableData,
  StickyHeadTableProps,
} from "../types/misc.types";
import { UserContext } from "../components/user-context";
import { getRecordsTrackInfo } from "../api/misc.api";
import { RECORDS_COLUMNS } from "../constants/misc.constants";
import { getFormattedRecords } from "../utils/misc.utils";
import useLoaderHook from "../hooks/useLoaderHook";
import { Box, CircularProgress, useMediaQuery } from "@mui/material";
import RecordsTable, { BigRecordsTable } from "../components/records-table";
import { DateFormats } from "../types/enums";
import dayjs from "dayjs";
import { useToast } from "@chakra-ui/react";

export interface RecordListingProps {}

export function StickyHeadTable(props: StickyHeadTableProps) {
  const {
    totalRecords,
    records,
    handleChangePage: handlePageChange,
    handleRowsChange,
    isLoadingData,
  } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    handlePageChange(event as React.MouseEvent, newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rowsAmount = +event.target.value;
    setRowsPerPage(rowsAmount);
    setPage(0);
    handleRowsChange(event as unknown as React.MouseEvent, rowsAmount);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        marginTop: "150px",
        borderRadius: "10px",
        boxShadow: "7px 7px 14px #a6a6a6,-7px -7px 14px #ffffff",
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {RECORDS_COLUMNS.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
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
                          {value}{" "}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {isLoadingData && (
        <Box width={"100%"} sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={totalRecords}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export const RecordListing = (props: RecordListingProps) => {
  const [records, setRecords] = useState<RecordsTableData[]>([]);
  const isLargerThan800 = useMediaQuery("(min-width:800px)");
  const toast = useToast();
  const [totalCount, setTotalCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const visitedPages = React.useRef<Set<number>>(new Set([1]));
  // setting last record since firebase actually needs the exact same document for querying
  const { isLoading, setIsLoading } = useLoaderHook();
  const [lastRecord, setLastRecord] = useState<any>(undefined);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getTotalCount = async (): Promise<number> => {
      const recordsSnap = await getRecordsTrackInfo(user?.uid);
      const recordsCount = recordsSnap.data()?.recordsCount ?? 0;
      setTotalCount(recordsSnap.data()?.recordsCount ?? 0);
      return recordsCount;
    };
    const getAndSaveRecords = async (): Promise<void> => {
      const { lastVisibleRecord, data }: FormattedRecordsResponse =
        await getFormattedRecords(user.uid);
      setLastRecord(lastVisibleRecord);
      setRecords(formatRecords(data));
    };
    setIsLoading(true);
    if (user?.uid) {
      getTotalCount().then(() => {
        getAndSaveRecords()
          .then((data) => {
            console.log(data);
          })
          .finally(() => {
            setIsLoading(false);
          });
      });
    }
  }, [user?.uid, setIsLoading]);

  const formatRecords = (records: RecordData[]): RecordsTableData[] => {
    return records.map((record) => ({
      ...record,
      date: dayjs(record.date).format(DateFormats.ListingDisplay),
      amount: `Nu. ${
        !Number.isNaN(+record.amount)
          ? (+record.amount).toLocaleString()
          : record.amount
      }`,
      phoneNumber: record.phoneNumber.toString(),
    }));
  };

  const handlePageChange = async (
    _: React.MouseEvent,
    page: number
  ): Promise<void> => {
    try {
      setIsLoading(true);
      if (user?.uid && !visitedPages.current.has(page)) {
        const { data, lastVisibleRecord }: FormattedRecordsResponse =
          await getFormattedRecords(user.uid, rowsPerPage, lastRecord);
        setRecords((records) => [...records, ...formatRecords(data)]);
        setLastRecord(lastVisibleRecord);
        visitedPages.current.add(page);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleRowsChange = async (_: React.MouseEvent, rowsPerPage: number) => {
  //   setRowsPerPage(rowsPerPage);
  //   if (user?.uid) {
  //     const { data, lastVisibleRecord } = await getFormattedRecords(
  //       user.uid,
  //       rowsPerPage
  //     );
  //     setRecords(data);
  //     setLastRecord(lastVisibleRecord);
  //   }
  // };
  return (
    <>
      {isLargerThan800 ? (
        <BigRecordsTable
          handlePageChange={handlePageChange}
          data={records}
          isLoading={isLoading}
          count={totalCount}
        />
      ) : (
        <RecordsTable
          data={records}
          isLoading={isLoading}
          count={totalCount}
          handlePageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default RecordListing;
