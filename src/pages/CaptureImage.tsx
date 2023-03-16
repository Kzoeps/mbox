import { extractText } from "../api/misc.api";
import CameraView from "../components/camera-view";
import { extractOCRData } from "../utils/misc.utils";

export default function CaptureImage() {
  const onCapture = async (image: string) => {
    const rawText = await extractText(image);
    const extractedData = extractOCRData(rawText);
    console.log(extractedData);
  }
  return (
    <>
      <CameraView onCancel={() => console.log('dsf')} onCapture={onCapture} />
    </>
  );
}
