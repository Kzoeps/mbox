import React from "react";
import CameraView from "../components/camera-view";
import { Box, IconButton } from "@chakra-ui/react";
import { MdOutlineClose } from "react-icons/md";
import { TbCapture } from "react-icons/tb";

export default function CaptureImage() {
  return (
    <>
      <CameraView />
      <Box display={'flex'} alignItems={'center'}>
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
          margin={{base: '0 auto'}}
          colorScheme="orange"
          size={"lg"}
          icon={<TbCapture size={"25px"} />}
          isRound
          aria-label={"capture"}
        />
        <Box minW={'40px'} maxW={'sm'} mr={5}/>
      </Box>
    </>
  );
}
