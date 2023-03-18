import { Box } from '@chakra-ui/react'
import React from 'react'

interface WhiteBoxProps {
    children: React.ReactNode
}

export default function WhiteBox({ children, ...props }: WhiteBoxProps & React.ComponentProps<typeof Box>) {
  return (
    <Box
      {...props}
        boxShadow={'xl'}
        rounded={'lg'}
        p={10}
        pt={'20px'}
        pb={0}
    >
        {children}
    </Box>
  )
}
