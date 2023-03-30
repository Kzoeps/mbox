import React from "react";
import { Box, Flex, useMediaQuery } from "@chakra-ui/react";

export interface DemoProps {}

export const Demo = (props: DemoProps) => {
  const [isMobileish] = useMediaQuery("(max-width: 680px)");
  return (
    <>
      <Flex align={"center"}>
        <Box margin={"auto"} mt={"50px"}>
          <iframe
            width={isMobileish ? "380" : "560"}
            height={isMobileish ? "214" : "315"}
            src="https://www.youtube.com/embed/nOuiSvc7roI?start=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </Box>
      </Flex>
    </>
  );
};

export default Demo;
