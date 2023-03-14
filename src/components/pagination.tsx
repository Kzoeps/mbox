import { Box, IconButton, Text } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export interface PaginationProps {
    count: number;
    rowsPerPage: number;
    onChangePage: (event: React.MouseEvent, page: number) => void;
    currentPage: number;
}

export default function Pagination(props: PaginationProps) {
    let rpp = 10;
    const { count, currentPage, onChangePage } = props;
    const getCurrentDisplay = () => {
        const start = (currentPage - 1) * rpp;
        const end = start + rpp;
        return `${start + 1}-${end > count ? count : end} of ${count}`;
    }
    const pageCount = Math.ceil(count / rpp);
  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap="20px"
        alignContent={"flex-end"}
      >
        <Box flex={"1 1 100%"} />
        <Text>{getCurrentDisplay()}</Text>
        <Box display={"flex"} justifyContent={"space-between"} gap="8px">
          <IconButton
            onClick={(event) => onChangePage(event, currentPage - 1)}
            isRound
            disabled={currentPage === 1}
            colorScheme="transparent"
            aria-label={"Go to previous page"}
            icon={<FaChevronLeft size="13px" color="rgba(0, 0, 0, 0.64)" />}
          />
          <IconButton
            onClick={(event) => onChangePage(event, currentPage + 1)}
            isRound
            disabled={currentPage === pageCount}
            colorScheme="transparent"
            aria-label={"Go to next page"}
            icon={<FaChevronRight size="13px" color="rgba(0, 0, 0, 0.64)" />}
          />
        </Box>
      </Box>
    </>
  );
}
