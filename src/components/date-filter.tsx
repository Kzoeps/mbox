import { Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { AiOutlineCalendar } from "react-icons/ai";
import GenericDialog from "./generic-dialog";
import dayjs from "dayjs";
import { DateFormats } from "../types/enums";

export interface DateRangeType {
  startDate: Date;
  endDate: Date;
  key: string;
}

const INIT_DATE_RANGE: Readonly<DateRangeType>= {
    startDate: dayjs().startOf("D").toDate(),
    endDate: new Date(),
    key: "selection",
};



interface DateFilterProps {
  onButtonClick: (_: React.MouseEvent) => void;
  displayValue: string;
  onConfirm: (param: DateRangeType) => void;
  isOpen: boolean;
  onClose: () => void;
}  
export const getDisplayDate = (start?: Date, end?: Date): string => {
  const startString = start
    ? dayjs(start).format(DateFormats.DisplayDate)
    : dayjs().format(DateFormats.DisplayDate);
  const endString = end
    ? dayjs(end).format(DateFormats.DisplayDate)
    : dayjs().format(DateFormats.DisplayDate);
  return `${startString}  -  ${endString}`;
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
        bg={"gray.100"}
        mt="20px"
        p="10px"
        borderRadius={"md"}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Button
          w={"full"}
          rightIcon={<AiOutlineCalendar />}
          onClick={onButtonClick}
          variant="outline"
        >
          {displayValue}
        </Button>
        <GenericDialog onConfirm={appenOnConfirm} isOpen={isOpen} onClose={onClose}>
          <DateRange
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
