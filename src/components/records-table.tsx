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
  const giveBorder = (id: string) => {
    return openRows[id] ? styles.noBorder : "";
  };
  return (
    <>
      <Box height="10px" maxW={"400px"} bg="orange.300" m={"10px"} mt="55px" />
      <Box borderRadius="lg" boxShadow={"base"} m="10px">
        <TableContainer>
          <Table>
            <TableCaption>Records table</TableCaption>
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
