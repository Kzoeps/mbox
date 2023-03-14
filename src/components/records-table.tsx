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
  IconButton,
} from "@chakra-ui/react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./records-table.module.css";
import { useState, Fragment } from "react";
import Pagination from "./pagination";

interface RecordsTableData {
  jrnlNumber: string;
  id: string;
  amount: string;
  date: string;
  remarks: string;
  phoneNumber: string;
}
interface RecordsTableProps {}
const data: RecordsTableData[] = [
  {
    jrnlNumber: "1238023",
    id: "1",
    amount: "Nu. 245,000",
    date: "March 23 2023",
    remarks: "Seed",
    phoneNumber: "+97517553422",
  }, // make more data
  {
    jrnlNumber: "1238023",
    id: "2",
    amount: "Nu. 245,000",
    date: "March 23 2023",
    remarks: "Seed",
    phoneNumber: "+97517553422",
  },
  {
    jrnlNumber: "1238023",
    id: "3",
    amount: "Nu. 245,000",
    date: "March 23 2023",
    remarks: "Seed",
    phoneNumber: "+97517553422",
  },
  {
    jrnlNumber: "1238023",
    id: "4",
    amount: "Nu. 245,000",
    date: "March 23 2023",
    remarks: "Seed",
    phoneNumber: "+97517553422",
  },
  {
    jrnlNumber: "1238023",
    id: "5",
    amount: "Nu. 245,000",
    date: "March 23 2023",
    remarks: "Seed",
    phoneNumber: "+97517553422",
  },
];

export default function RecordsTable(props: RecordsTableProps) {
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState(1);
  const giveBorder = (id: string) => {
    return openRows[id] ? styles.noBorder : "";
  };
  const handleNext = (event: React.MouseEvent, page: number) => {
    setPage(page);
  }
  return (
    <>
      <Box height="10px" maxW={"400px"} bg="orange.300" m={"10px"} mt="55px" />
      <Box borderRadius="lg" boxShadow={"base"} m="10px">
        <TableContainer>
          <Table>
            <TableCaption>
              <Pagination count={30} rowsPerPage={10} onChangePage={handleNext} currentPage={page}/>
              {/* <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                gap="20px"
                alignContent={"flex-end"}
              >
                <Box flex={"1 1 100%"} />
                <Text>1-10 of 21</Text>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  gap="8px"
                >
                  <IconButton isRound colorScheme="transparent" aria-label={"Go to previous page"} icon={<FaChevronLeft size="13px" color="rgba(0, 0, 0, 0.64)"/>} />
                  <IconButton isRound colorScheme="transparent" aria-label={"Go to next page"} icon={<FaChevronRight size="13px" color="rgba(0, 0, 0, 0.64)"/>} />
                </Box>
              </Box> */}
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Jrnl No.</Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(
                ({ id, amount, jrnlNumber, ...item }: RecordsTableData) => (
                  <Fragment key={id}>
                    <Tr
                      onClick={() => {
                        setOpenRows({ ...openRows, [id]: !openRows[id] });
                      }}
                    >
                      <Td className={giveBorder(id)}>{jrnlNumber}</Td>
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
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
