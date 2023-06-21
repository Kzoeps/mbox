import { findBestMatch } from "string-similarity";
import { PNBPrimaryInfo } from "../../../types/enums";
import { ExtractedOCRData } from "../../../types/misc.types";
import { dateConversion, getStringiDate } from "../../../utils/misc.utils";
import { extractBNBRemarks } from "./bnb-extraction";
import { findAmount, findDate } from "./extraction.utils";

const extractPNBTxnId = (data: string[]): string => {
  const { bestMatch } = findBestMatch(PNBPrimaryInfo.Journal, data);
  const matches = bestMatch.target.match(/\d{5,}/);
  if (matches?.length) {
    return matches[0];
  }
  return "";
};
export const extractPNBData = (data: string[]): ExtractedOCRData => {
  return {
    amount: findAmount(data),
    remarks: extractPNBRemarks(data),
    journalNumber: extractPNBTxnId(data),
    date: getStringiDate(dateConversion(findDate(data))),
  };
};

const extractPNBRemarks = (data: string[]): string => {
  return extractBNBRemarks(data);
};

