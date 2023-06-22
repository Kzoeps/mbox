import { useNavigate } from "react-router-dom";
import { extractText, uploadCrash } from "../../api/misc.api";
import CameraView from "../../components/camera-view";
import useLoaderHook from "../../hooks/useLoaderHook";
import MboxSpinner from "../../components/spinner";
import { Spinner } from "@chakra-ui/react";
import { cleanOCRData, detectBank, formatOCR } from "./utils/extraction.utils";
import { BankIdentifier } from "../../types/enums";
import { extractBNBInfo } from "./utils/bnb-extraction";
import { extractBOBData } from "./utils/mbob-extraction";
import { extractPNBData } from "./utils/pnb-extraction";
import { ExtractedOCRData } from "../../types/misc.types";
import { useContext } from "react";
import { UserContext } from "../../components/user-context";

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

const handleCrash = (data: ExtractedOCRData, image: string) => {
  if (checkIfMissing(data)) {
    try  {
      void uploadCrash(image);
    } catch (e) {
      console.error(e);
    }
  }
}

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
    handleCrash(extractedData, image);
    navigate("/add-record", {
      state: extractedData,
    });
  };

  return (
    <>
      <CameraView pending={isLoading} onCancel={() => navigate('/dashboard')} onCapture={onCapture} />
      {isLoading && <MboxSpinner top="50%"/>}
      <Spinner opacity={0.1} w="1px" h="1px"/> 
    </>
  );
}
