import { Text, Box, IconButton } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { TbCapture } from "react-icons/tb";
import styles from "./camera.module.css";
import { MediaDevicesError, MediaDevicesErrorMessages } from "../types/enums";
import { IoCameraReverseOutline } from "react-icons/io5";

export default function CameraView() {
  const camera = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [facingMode, setFacingMode] = useState("environment");
  const [isShot, setIsShot] = useState(false);
  const [isPicTaken, setIsPicTaken] = useState(false);
  const [error, setError] = useState<MediaDevicesError | undefined>(undefined);

  const stopStreaming = useCallback(() => {
    if (camera.current && camera.current.srcObject) {
      const stream = camera.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  }, []);

  useEffect(() => {
    const getCamera = async () => {
      console.log("df");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode,
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
    } else {
      startStreaming();
      setIsPicTaken(false);
    }
  };
  return (
    <>
      { 
        <video
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
          style={{
            display: isPicTaken ? "block" : "none",
          }}
        />
      }
      <div
        className={`${styles.flash}`}
        style={{ display: isShot ? "block" : "none" }}
      ></div>
      <Box display={"flex"} alignItems={"center"}>
        <IconButton
          variant={"outline"}
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
          colorScheme="orange"
          size={"lg"}
          icon={<TbCapture size={"25px"} />}
          isRound
          aria-label={"capture"}
        />
        <IconButton
          variant={"outline"}
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
