import {
  Table,
  Thead,
  Text,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import styles from "./records-table.module.css";
import React, { useState, Fragment, Dispatch, SetStateAction } from "react";
import Pagination from "./pagination";
import { RecordsTableData } from "../types/misc.types";
import MboxSpinner from "./spinner";

interface RecordsTableProps {
  data: RecordsTableData[];
  count: number;
  currentPage: number;
  isLoading: boolean;
  handlePageChange: (Event: React.MouseEvent, page: number) => void;
}
const spliceRecords = (records: RecordsTableData[], page: number) => {
  const startIndex = (page - 1) * 10;
  const endIndex = startIndex + 10;
  return records.slice(startIndex, endIndex);
};
const emptyRows = (data: RecordsTableData[], page: number) => {
  const rows = 10 - spliceRecords(data, page).length;
  return rows;
};

export default function RecordsTable(props: RecordsTableProps) {
  const { data, currentPage: page, count, isLoading, handlePageChange } = props;
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});
  const giveBorder = (id: string | number) => {
    return openRows[id] ? styles.noBorder : "";
  };

  return (
    <>
      <Box height="10px" maxW={"800px"} bg="orange.300" m={"10px"} mt="45px" />
      <Box borderRadius="lg" boxShadow={"base"} m="10px">
        <TableContainer>
          <Table>
            <TableCaption>
              <Pagination
                count={count}
                rowsPerPage={10}
                onChangePage={handlePageChange}
                currentPage={page}
              />
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Jrnl No.</Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {spliceRecords(data, page).map(
                ({ id, amount, journalNumber, ...item }: RecordsTableData) => (
                  <Fragment key={id}>
                    <Tr
                      onClick={() => {
                        setOpenRows({ ...openRows, [id]: !openRows[id] });
                      }}
                    >
                      <Td className={giveBorder(id)}>{journalNumber}</Td>
                      <Td className={giveBorder(id)}>{amount}</Td>
                      <Td className={giveBorder(id)}>
                        {openRows[id] ? <BsChevronUp /> : <BsChevronDown />}
                      </Td>
                    </Tr>
                    {!!openRows[id] && (
                      <Tr>
                        <Td></Td>
                        <Td style={{ paddingTop: 0 }} colSpan={2}>
                          <Text>Date: {item.date}</Text>
                          <Text>Remarks: {item.remarks}</Text>
                          <Text>Phone number: {item.phoneNumber}</Text>
                        </Td>
                      </Tr>
                    )}
                  </Fragment>
                )
              )}
              {!!emptyRows(data, page) && (
                <Tr height={52 * emptyRows(data, page)}>
                  <Td colSpan={3}></Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>

        {isLoading && <MboxSpinner top="50%" />}
      </Box>
    </>
  );
}

export const BigRecordsTable = (props: RecordsTableProps) => {
  const { handlePageChange, currentPage: page, data, count, isLoading } = props;

  return (
    <>
      <Box borderRadius="lg" boxShadow="base" m="70px" mt="40px">
        <TableContainer>
          <Table variant="simple">
            <TableCaption>
              <Pagination
                count={count}
                rowsPerPage={10}
                onChangePage={handlePageChange}
                currentPage={page}
              />
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Jrnl No.</Th>
                <Th>Amount</Th>
                <Th>Date</Th>
                <Th>Phone Number</Th>
                <Th>Remarks</Th>
              </Tr>
            </Thead>
            <Tbody>
              {spliceRecords(data, page).map((record) => (
                <Tr key={record.id}>
                  <Td>{record.journalNumber}</Td>
                  <Td>{record.amount}</Td>
                  <Td>{record.date}</Td>
                  <Td>{record.phoneNumber}</Td>
                  <Td>{record.remarks}</Td>
                </Tr>
              ))}
              {!!emptyRows(data, page) && (
                <Tr height={52 * emptyRows(data, page)}>
                  <Td colSpan={3}></Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      {isLoading && <MboxSpinner top="50%" />}
    </>
  );
};
