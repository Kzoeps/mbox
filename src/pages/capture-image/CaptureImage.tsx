import { useNavigate } from "react-router-dom";
import { addCrashRecord, extractText, uploadCrash } from "../../api/misc.api";
import CameraView from "../../components/camera-view";
import useLoaderHook from "../../hooks/useLoaderHook";
import MboxSpinner from "../../components/spinner";
import { Spinner } from "@chakra-ui/react";
import { cleanOCRData, detectBank, formatOCR } from "./utils/extraction.utils";
import { BankIdentifier } from "../../types/enums";
import { extractBNBInfo } from "./utils/bnb-extraction";
import { extractBOBData } from "./utils/mbob-extraction";
import { extractPNBData } from "./utils/pnb-extraction";
import { ExtractedOCRData, VisionOCRData } from "../../types/misc.types";
import { useContext } from "react";
import { UserContext } from "../../components/user-context";
import * as hri from 'human-readable-ids';

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
      void addCrashRecord(id, {...data, extractedText})
      void uploadCrash(image, id);
    } catch (e) {
      console.error(e);
    }
  }
}

// const dummyText: VisionOCRData = { detection: [{ description: "3:36\nTransaction Successful\nFrom A/\n100000094\nmBOB\nMOBILE BANKING\nNu. 110.00\nPurpose/Bill GR:\n$\nJeni. No\n1110908\nOK\nLTE\nTo:\nZNTHAR TSHONGK...\nDate\n26 Jun 2023 15:35.37\nShare" }] }

export default function CaptureImage() {
  const navigate = useNavigate();
  const { isLoading, wrapperBhai } = useLoaderHook();
  const { user } = useContext(UserContext);
  const onCapture = async (image: string) => {
    const token = await user?.getIdToken();
    const wrappedExtract = wrapperBhai(extractText);
    const rawText = await wrappedExtract(image, token);
    if (!rawText) return;
    const formattedText = cleanOCRData(formatOCR(rawText));
    const extractedData = extractInfo(formattedText);
    handleCrash(extractedData, rawText, image);
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
