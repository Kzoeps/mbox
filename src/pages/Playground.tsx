import React from 'react'
import { findBestMatch } from "string-similarity";
import { BankIdentifier } from '../types/enums';

export default function Playground() {
    const MPAY = "TRANSACTION SUCCESSFUL\nMPay\nNu. 7,140.00\nReference No : 008MFTR231650085\nRRN: 316527363525\nFrom:\nKINLEY GYEM\n5XXXXXXXXX4004\nSave\nTo:\nMR. MANOJ KUMAR\nBARARIA 1XXXX4568\nBank of Bhutan Ltd.\nDate: Wednesday, 14 June 2023\nTime: 11:23:25 AM\nRemarks: garbage bag home\nOK\nShare"
    const EPAY = "11:10\n00\nQrukPay\nyour partner indtal growne\nTRANSACTION STATUS C\nTransaction Successful\nPaid: Nu.20.00\nPayer Acc. No.: XXXXXXXXX0756\nPayee Acc. No.: XXXXXXXXX0690, Miss.\nKINLEY GYEM, Bank of Bhutan Ltd.\nRemarks: hey\nRef. No.: 316523102087\nWednesday, 14 June 2023,11:10:12 PM\nvia DrukPay."
    const MBOB = "achment_id=895311528226 Tessal\nTransaction Successful\nFrom A/C:\n20XXXXX95\nPurpose:\nAm Karmal\nmBOB\nMOBILE BANK NO\nSave\nNu. 81,000.00\nJrnl. No\n282429\nOK\nTo A/C:\n10XXXXX90\nDate:\n01 May 2023 10:01:11.\n5\nShare"

    const cleanData = (data: string[]): string[] => {
      const cleanedData = data.map((item) => { return item.toLowerCase().trim()})
      return cleanedData
    }

    const detectBank = (data: string[]): BankIdentifier => {
      const bankIdentifiers = [BankIdentifier.BNB, BankIdentifier.BOB, BankIdentifier.PNB]
      const ratings = bankIdentifiers.map((bank) => {
        const {bestMatch: {rating}} = findBestMatch(bank, data)
        return rating
      })
      const maxRating = Math.max(...ratings)
      return bankIdentifiers[ratings.indexOf(maxRating)]
    }

    const extractBNBTxnId = (data: string[]): string => {
      const {bestMatch} = findBestMatch("reference no", data)
      let split = bestMatch.target.split(" ");
      const {bestMatch: bmR, bestMatchIndex: bmri} = findBestMatch("reference", split)
      if (bmR.rating > 0.5) {
        split.splice(bmri, 1)
      }
      const {bestMatch: bmR2, bestMatchIndex: bmri2} = findBestMatch("no", split)
      if (bmR2.rating > 0.5 && bmR2.target.length <= 4) {
        split.splice(bmri2, 1)
      }
      const containsAlphNumber = /^(?=.*[a-zA-Z])(?=.*[0-9])[\w\d]{6,}/
      const txnID = split.find((item) => {
        return item.match(containsAlphNumber)
      })
      if (txnID) {
        return txnID.toUpperCase()
      }
      return ""
    }

    const extractBNBRemarks = (data: string[]): string => {
      const {bestMatch} = findBestMatch("remarks", data)
      const divvied = bestMatch.target.split(" ")
      const {bestMatchIndex: remarksIndex}= findBestMatch("remarks", divvied) 
      divvied.splice(remarksIndex, 1)
      console.log(divvied.join(" ").replace(":", "").trim())
      return ""
    }

    const extractPNBTxnId = (data: string[]): string => {
      const {bestMatch} = findBestMatch("ref. no.", data)
      const digits = /\d{5,}/
      const matches = bestMatch.target.match(digits)
      if (matches?.length) {
        return matches[0]
      } 
      return ""
    }

    const extractPNBRemarks = (data: string[]): string => {
      return extractBNBRemarks(data)
    }

    const extract = (data: string[], bank: BankIdentifier) => {
      switch (bank) {
        case BankIdentifier.BNB:
          // use same function for amount
          break;
        case BankIdentifier.BOB:
          break;
        case BankIdentifier.PNB:
          break;
        default:
          break;
      }
    }

    extract(cleanData(MPAY.split("\n")), detectBank(cleanData(MPAY.split("\n"))))
    extract(cleanData(EPAY.split("\n")), detectBank(cleanData(EPAY.split("\n"))))
    extract(cleanData(MBOB.split("\n")), detectBank(cleanData(MBOB.split("\n"))))
  return (
    <div>Playground</div>
  )
}
