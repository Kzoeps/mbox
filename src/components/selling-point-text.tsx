import { Text, Box, Heading, Container } from '@chakra-ui/react'
import React, { forwardRef } from 'react'
import { Maybe } from '../utils/util.types'

interface SellingPointTextProps {
    title: string;
    description: string;
}

const SellingPointText = forwardRef<Maybe<HTMLDivElement>, SellingPointTextProps & React.ComponentProps<typeof Box>>(function ({title, description, ...props}, ref) {
  return (
    <Box {...props} ref={ref} pt={"50px"} maxW={"sm"} textAlign={"center"}>
        <Heading
          fontFamily={"League Spartan"}
          mt={"30px"}
          mb={"15px"}
          color="orange.500"
        >
            {title}
        </Heading>
        <Container maxW={"sm"}>
          <Text mb="40px" color={"gray.500"}>
            {description}
          </Text>
        </Container>
      </Box>
  )
})

export default SellingPointText;