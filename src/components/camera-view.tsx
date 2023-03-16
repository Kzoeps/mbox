import { Box, IconButton } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { TbCapture } from "react-icons/tb";
import styles from "./camera.module.css";

export default function CameraView() {
  const camera = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [hasFunctionality, setHasFunctionality] = useState(true);
  const [isShot, setIsShot] = useState(false);
  const [isPicTaken, setIsPicTaken] = useState(false);
  useEffect(() => {
    const isAvailable = "mediaDevices" in navigator;
    if (isAvailable) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: "environment",
          },
        })
        .then((stream) => {
          if (camera.current) {
            camera.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setHasFunctionality(isAvailable);
  }, []);

  const flash = () => {
    setIsShot(true);
    setTimeout(() => {
      setIsShot(false);
    }, 50);
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
      flash();
    } else {
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
      {/* {hasFunctionality ? <video
        autoPlay
        ref={camera}
        style={{
            display: isPicTaken ? 'none' : 'block',
          maxWidth: "450px",
          width: "100%",
          maxHeight: "700px",
          height: "100vh",
        }}
      /> : <p>Camera not supported</p>} */}
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
        style={{ opacity: isShot ? 1 : 0 }}
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
        <Box minW={"40px"} maxW={"sm"} mr={5} />
      </Box>
    </>
  );
}
