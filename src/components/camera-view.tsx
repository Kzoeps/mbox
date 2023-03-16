import React, { useEffect, useRef, useState } from "react";

export default function CameraView() {
  const camera = useRef<HTMLVideoElement>(null);
  const [hasFunctionality, setHasFunctionality] = useState(true);
  useEffect(() => {
    const isAvailable = "mediaDevices" in navigator;
    if (isAvailable) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
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
  return (
    <>
      {hasFunctionality ? <video
        autoPlay
        ref={camera}
        style={{
          maxWidth: "450px",
          width: "100%",
          maxHeight: "600px",
          height: "100vh",
        }}
      /> : <p>Camera not supported</p>}
    </>
  );
}
