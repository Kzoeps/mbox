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
import { useState, Fragment } from "react";
import Pagination from "./pagination";
import { RecordsTableData } from "../types/misc.types";
import MboxSpinner from "./spinner";

interface RecordsTableProps {
  data: RecordsTableData[];
  count: number;
  isLoading: boolean;
  handlePageChange: (Event: React.MouseEvent, page: number) => void;
}

export default function RecordsTable(props: RecordsTableProps) {
  const { data, count, isLoading, handlePageChange } = props;
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState(1);
  const giveBorder = (id: string | number) => {
    return openRows[id] ? styles.noBorder : "";
  };
  const setPageChange = (_: React.MouseEvent, page: number) => {
    setPage(page);
    handlePageChange(_, page);
  };

  const spliceRecords = (records: RecordsTableData[], page: number) => {
    const startIndex = (page-1) * 10;
    const endIndex = startIndex + 10;
    return records.slice(startIndex, endIndex);
  };

  const emptyRows = () => {
    const rows = 10 - spliceRecords(data, page).length;
    return rows;
  }
  return (
    <>
      <Box height="10px" maxW={"400px"} bg="orange.300" m={"10px"} mt="55px" />
      <Box borderRadius="lg" boxShadow={"base"} m="10px">
        <TableContainer>
          <Table>
            <TableCaption>
              <Pagination
                count={count}
                rowsPerPage={10}
                onChangePage={setPageChange}
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
              {!!emptyRows() && <Tr height={52*emptyRows()}><Td colSpan={3}></Td></Tr>}
            </Tbody>
          </Table>
        </TableContainer>

      {isLoading && <MboxSpinner top="50%"/>}
      </Box>
    </>
  );
}
