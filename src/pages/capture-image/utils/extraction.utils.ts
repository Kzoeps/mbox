import { findBestMatch } from "string-similarity";
import { BANK_IDENTIFIERS } from "../../../constants/misc.constants";
import { BankIdentifier, PrimaryInfo } from "../../../types/enums";
import { SegregatedDateTime, VisionOCRData } from "../../../types/misc.types";

const findAmountThroughRegex = (data: string[]): string | undefined => {
  const ngultrumRegex = /^\bnu(\.?)\s*[\d,]+\b$/;
  const match = data.find((item) => ngultrumRegex.test(item));
  if (match) {
    const amountRegex = /\d+/g;
    const firstMatch = match.replace(/(\d)(,)(\d)/, "$1$3");
    const amounts = firstMatch.match(amountRegex);
    if (amounts?.length) {
      return amounts[0];
    }
  }
  return undefined
}

export const findAmount = (data: string[]): string | undefined => {
  if (findAmountThroughRegex(data)) return findAmountThroughRegex(data);
  let {
    bestMatch: { target: bestMatch },
  } = findBestMatch(PrimaryInfo.Amount, data);
  const amountRegex = /\d+/g;
  if (bestMatch) {
    // to remove commas from large numbers such as Nu. 18,230
    bestMatch = bestMatch.replace(/(\d)(,)(\d)/, "$1$3");
    const amounts = bestMatch.match(amountRegex);
    if (amounts?.length) {
      return amounts[0];
    }
  }
  return undefined;
};

export const findDate = (data: string[]): SegregatedDateTime => {
  const dateTime: SegregatedDateTime = {
    date: undefined,
    time: undefined,
  };
  const { bestMatchIndex } = findBestMatch(PrimaryInfo.Date, data);
  const dateExpression =
    /(\d{1,2}?\s+[a-zA-z]{3,4}\s+\d{4})\s+(\d{2}:?\d{2}:?\d{0,2})?/g;
  const dateMatch = data[bestMatchIndex + 1];
  if (dateMatch) {
    const matches = Array.from(dateMatch.matchAll(dateExpression));
    dateTime.date = matches?.[0]?.[1];
    dateTime.time = matches?.[0]?.[2];
  }
  return dateTime;
};

export const detectBank = (data: string[]): BankIdentifier => {
  if (data.length) {
    const matchRatings = BANK_IDENTIFIERS.map((bank) => {
      const { bestMatch } = findBestMatch(bank, data);
      return bestMatch.rating;
    });
    const maxRating = Math.max(...matchRatings);
    return BANK_IDENTIFIERS[matchRatings.indexOf(maxRating)];
  } else {
    return BankIdentifier.BOB;
  }
};

export const cleanOCRData = (data: string[]): string[] => {
  return data.map((item) => item.toLowerCase().trim());
};

export const getDescription = (data: VisionOCRData): string => {
  return data?.detection?.[0]?.description || "";
}


export const formatOCR = (data: VisionOCRData): string[] => {
  if (getDescription(data) === "") return [];
  const textSummary = getDescription(data).split("\n") || [];
  return textSummary;
};
