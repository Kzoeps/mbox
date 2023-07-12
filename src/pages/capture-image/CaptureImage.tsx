import { Spinner } from "@chakra-ui/react";
import * as hri from 'human-readable-ids';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { addCrashRecord, extractText, uploadCrash } from "../../api/misc.api";
import CameraView from "../../components/camera-view";
import MboxSpinner from "../../components/spinner";
import { UserContext } from "../../components/user-context";
import useLoaderHook from "../../hooks/useLoaderHook";
import { BankIdentifier } from "../../types/enums";
import { ExtractedOCRData, VisionOCRData } from "../../types/misc.types";
import { extractBNBInfo } from "./utils/bnb-extraction";
import { cleanOCRData, detectBank, formatOCR, getDescription } from "./utils/extraction.utils";
import { extractBOBData } from "./utils/mbob-extraction";
import { extractPNBData } from "./utils/pnb-extraction";

const extractInfo = (data: string[]): ExtractedOCRData => {
  const bank = detectBank(data);
  switch (bank) {
    case BankIdentifier.BNB:
      return extractBNBInfo(data);
    case BankIdentifier.BOB:
      return extractBOBData(data);
    case BankIdentifier.PNB:
      return extractPNBData(data);
    default:
      return extractBOBData(data);
  }
}

const checkIfMissing = (data: ExtractedOCRData) => {
  const { amount, journalNumber, remarks } = data;
  return !amount || !journalNumber || !remarks;
}

const handleCrash = (data: ExtractedOCRData, extractedText: string, image: string) => {
  if (checkIfMissing(data)) {
    try {
      const id = hri.hri.random();
      void addCrashRecord(id, { ...data, extractedText })
      void uploadCrash(image, id);
    } catch (e) {
      console.error(e);
    }
  }
}

// const dummyText: VisionOCRData = { detection: [{ description: "9:36 0\nPayment Successful\nPay From\nPay To\nTransfer\nAmount\n********\n40%\n*****1501\n120\nTransfer Shopping\nPurpose\n*6594\nTransaction 2023.07.08\nTime\n21:36:15\nOK\nMAKE ANOTHER\nTRANSACTION\nDigital Receipt 318921301971\nNo\nRR Number 318921301971\nSHARE" }] }

export default function CaptureImage() {
  const navigate = useNavigate();
  const { isLoading, wrapperBhai } = useLoaderHook();
  const { user } = useContext(UserContext);
  const onCapture = async (image: string) => {
    const token = await user?.getIdToken();
    const wrappedExtract = wrapperBhai(extractText);
    const rawResponse = await wrappedExtract(image, token);
    if (!rawResponse) return;
    const formattedText = cleanOCRData(formatOCR(rawResponse));
    const extractedData = extractInfo(formattedText);
    handleCrash(extractedData, getDescription(rawResponse), image);
    navigate("/add-record", {
      state: extractedData,
    });
  };

  return (
    <>
      <CameraView pending={isLoading} onCancel={() => navigate('/dashboard')} onCapture={onCapture} />
      {isLoading && <MboxSpinner top="50%" />}
      <Spinner opacity={0.1} w="1px" h="1px" />
    </>
  );
}
