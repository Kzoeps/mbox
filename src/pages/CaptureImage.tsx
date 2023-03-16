import { useNavigate } from "react-router-dom";
import { extractText } from "../api/misc.api";
import CameraView from "../components/camera-view";
import { extractOCRData } from "../utils/misc.utils";
import useLoaderHook from "../hooks/useLoaderHook";
import MboxSpinner from "../components/spinner";

export default function CaptureImage() {
  const navigate = useNavigate();
  const { isLoading, wrapperBhai } = useLoaderHook();
  const onCapture = async (image: string) => {
    const wrappedExtract = wrapperBhai(extractText);
    const rawText = await wrappedExtract(image);
    if (!rawText) return;
    const extractedData = extractOCRData(rawText);
    navigate("/add-record", {
      state: extractedData,
    });
  };
  return (
    <>
      <CameraView pending={isLoading} onCancel={() => navigate('/dashboard')} onCapture={onCapture} />
      {isLoading && <MboxSpinner top="50%"/>}
    </>
  );
}
