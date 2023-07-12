import { findBestMatch } from "string-similarity";
import { BNBPrimaryInfo } from "../../../types/enums";
import { ExtractedOCRData } from "../../../types/misc.types";
import { findAmount, findDate } from "./extraction.utils";
import { dateConversion, getStringiDate } from "../../../utils/misc.utils";

// so we delete the reference and no text and then try and find the alphanumeric id
export const extractBNBTxnId = (data: string[]): string => {
  const { bestMatch } = findBestMatch(BNBPrimaryInfo.Journal, data);
  let divvied = bestMatch.target.split(" ");
  // delete the "referenece" text 
  const { bestMatch: reference, bestMatchIndex: referenceIndex } =
    findBestMatch("reference", divvied);
  if (reference.rating > 0.5) {
    divvied.splice(referenceIndex, 1);
  }
  // try and find no and delete that as well
  const { bestMatch: no, bestMatchIndex: noIndex } = findBestMatch(
    "no",
    divvied
  );
  if (no.rating > 0.5 && no.target.length <= 4) {
    divvied.splice(noIndex, 1);
  }
  const containsAlphNumber = /(?=.*[a-zA-Z])(?=.*[0-9])[\w\d]{6,}/;
  // from the remaining values try and see if theres an alphanumeric id with character of 6 or more
  const txnId = divvied.find((item) => containsAlphNumber.test(item));
  if (txnId) {
    // if there is return the alphanumeric id since we dont want the ":" etc
    const match = txnId.match(containsAlphNumber)
    if (match?.length) return match[0].toUpperCase()
    return ""
  }
  return "";
};

export const extractBNBRemarks = (data: string[]): string => {
  const {bestMatch: {target}} = findBestMatch(BNBPrimaryInfo.Remark, data);
  const divvied = target.split(" ");
  const {bestMatchIndex: remarksIndex, bestMatch: {rating}} = findBestMatch("remarks", divvied);
  let remarks = ""
  if (rating > 0.5) {
    divvied.splice(remarksIndex, 1);
    remarks = divvied.join(" ").replace(":", "").trim();
  }
  return remarks;
}

export const extractBNBInfo = (data: string[]): ExtractedOCRData => {
  return {
    amount: findAmount(data),
    remarks: extractBNBRemarks(data),
    journalNumber: extractBNBTxnId(data),
    date: getStringiDate(dateConversion(findDate(data))),
  };
}