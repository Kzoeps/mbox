import { Text, Box, IconButton } from "@chakra-ui/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { TbCapture } from "react-icons/tb";
import styles from "./camera.module.css";
import { MediaDevicesError, MediaDevicesErrorMessages } from "../types/enums";
import { IoCameraReverseOutline } from "react-icons/io5";

export interface CameraViewProps {
  onCancel: () => void;
  onCapture: (image: string) => void;
  pending: boolean
}

export default function CameraView(props: CameraViewProps) {
  const camera = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [facingMode, setFacingMode] = useState("environment");
  const [isShot, setIsShot] = useState(false);
  const [isPicTaken, setIsPicTaken] = useState(false);
  const [error, setError] = useState<MediaDevicesError | undefined>(undefined);
  const { onCancel, onCapture, pending } = props;

  const stopStreaming = useCallback(() => {
    if (camera.current && camera.current.srcObject) {
      const stream = camera.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  }, []);

  useEffect(() => {
    const getCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode,
            width: { ideal: 1280},
            height: { ideal: 720}
          },
        });
        if (camera.current && camera.current.srcObject) {
          stopStreaming();
        }
        if (camera.current) {
          camera.current.srcObject = stream;
        }
      } catch (e: DOMException | TypeError | any) {
        setError(e.name);
      }
    };
    camera?.current && getCamera();
    return () => {
      stopStreaming();
    };
  }, [facingMode, stopStreaming]);

  useLayoutEffect(() => {
    return () => {
      stopStreaming();
    }
  },[stopStreaming])

  const flash = () => {
    setIsShot(true);
    setTimeout(() => {
      setIsShot(false);
    }, 50);
  };

  const disableStreaming = () => {
    if (camera.current && camera.current.srcObject) {
      const stream = camera.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => (track.enabled = false));
    }
  };

  const startStreaming = () => {
    if (camera.current && camera.current.srcObject) {
      const stream = camera.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => (track.enabled = true));
    }
  };

  // function to capture image
  const captureImage = () => {
    if (canvas.current && camera.current && !isPicTaken) {
      const context = canvas.current.getContext("2d");
      context?.drawImage(
        camera.current,
        0,
        0,
        canvas.current.width,
        canvas.current.height
      );
      setIsPicTaken(true);
      disableStreaming();
      flash();
      onCapture(canvas.current.toDataURL("image/jpeg", 0.75));
    } else {
      startStreaming();
      setIsPicTaken(false);
    }
  };

  const handleClose = (event: React.MouseEvent) => {
    setIsPicTaken(false);
    onCancel();
  }
  return (
    <>
      { 
        <video
          playsInline
          autoPlay
          ref={camera}
          className={`${styles.cam_display}`}
          style={{
            display: isPicTaken ? "none" : "block",
          }}
        />
      }
      {error && (
        <Box className={`${styles.error_display}`}>
          <Text>{MediaDevicesErrorMessages[error]}</Text>
        </Box>
      )}
      {
        <canvas
          ref={canvas}
          className={`${styles.cam_display}`}
          height={720}
          style={{
            display: isPicTaken ? "block" : "none",
          }}
        />
      }
      <div
        className={`${styles.flash}`}
        style={{ display: isShot ? "block" : "none" }}
      ></div>
      <Box display={"flex"} mt="10px" alignItems={"center"}>
        <IconButton
          variant={"outline"}
          onClick={handleClose}
          disabled={pending}
          icon={<MdOutlineClose />}
          colorScheme="orange"
          size={"sm"}
          ml={5}
          isRound
          aria-label="cancel"
        />
        <IconButton
          margin={{ base: "0 auto" }}
          onClick={captureImage}
          disabled={pending}
          colorScheme="orange"
          size={"lg"}
          icon={<TbCapture size={"25px"} />}
          isRound
          aria-label={"capture"}
        />
        <IconButton
          variant={"outline"}
          disabled={pending}
          onClick={() =>
            setFacingMode(facingMode === "environment" ? "user" : "environment")
          }
          icon={<IoCameraReverseOutline />}
          colorScheme="orange"
          size={"sm"}
          mr={5}
          isRound
          aria-label="cancel"
        />
      </Box>
    </>
  );
}
