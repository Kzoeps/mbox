import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { AiOutlineCalendar } from "react-icons/ai";
import GenericDialog from "./generic-dialog";
import { DateRangeType } from "../types/misc.types";
import { INIT_DATE_RANGE } from "../constants/misc.constants";
import { withSuspense } from "./suspense-wrapper";

const DateRangeA = withSuspense(React.lazy(() => import("react-date-range").then((module) => ({ default: module.DateRange }))));


interface DateFilterProps {
  onButtonClick: (_: React.MouseEvent) => void;
  displayValue: string;
  onConfirm: (param: DateRangeType) => void;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}  
export default function DateFilter(props: DateFilterProps) {
  const [dateRange, setDateRange] = useState([{...INIT_DATE_RANGE}]);
  const { onButtonClick, displayValue, isOpen, onClose, onConfirm } = props;
  const appenOnConfirm = () => {
    onConfirm(dateRange[0]);
  }
  return (
    <>
      <Box
        m="auto"
        maxW={"315px"}
        bg={useColorModeValue("white", "gray.700")}
        mt="20px"
        p="10px"
        borderRadius={"md"}
        display={"flex"}
        justifyContent={"space-between"}
      >
        {!!props.children && props.children}
        <Button
          w={"full"}
          rightIcon={<AiOutlineCalendar />}
          onClick={onButtonClick}
          variant="outline"
        >
          {displayValue}
        </Button>
        <GenericDialog onConfirm={appenOnConfirm} isOpen={isOpen} onClose={onClose}>
          <DateRangeA
            maxDate={new Date()}
            showDateDisplay={false}
            editableDateInputs={true}
            /* @ts-ignore */
            onChange={(item) => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
          />
        </GenericDialog>
      </Box>
    </>
  );
}
