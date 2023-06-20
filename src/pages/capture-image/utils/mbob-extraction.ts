import { findBestMatch } from "string-similarity";
import { findAmount, findDate } from "./extraction.utils";
import { PrimaryInfo } from "../../../types/enums";
import { ExtractedOCRData } from "../../../types/misc.types";
import { getStringiDate, dateConversion } from "../../../utils/misc.utils";

const findRemark = (data: string[]): string | undefined => {
  const { bestMatchIndex } = findBestMatch(PrimaryInfo.Remark, data);
  if (data.length > bestMatchIndex + 1) {
    return data[bestMatchIndex + 1];
  }
};

const findJournalNumber = (data: string[]): string | undefined => {
  const { bestMatchIndex } = findBestMatch(PrimaryInfo.Journal, data);
  const journalExpression = /\d{4,}/;
  if (
    data[bestMatchIndex + 1] &&
    journalExpression.test(data[bestMatchIndex + 1])
  ) {
    return data[bestMatchIndex + 1];
  }
};

export const extractBOBData = (data: string[]): ExtractedOCRData => {
  return {
    amount: findAmount(data),
    remarks: findRemark(data),
    journalNumber: findJournalNumber(data),
    date: getStringiDate(dateConversion(findDate(data))),
  };
};

