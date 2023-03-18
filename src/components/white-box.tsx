import { Box } from '@chakra-ui/react'
import React, { forwardRef } from 'react'
import { Maybe } from '../utils/util.types'

interface WhiteBoxProps {
    children: React.ReactNode
}

const WhiteBox = forwardRef<Maybe<HTMLDivElement>, WhiteBoxProps & React.ComponentProps<typeof Box>>(function ({ children, ...props }, ref) {
  return (
    <Box
    ref={ref}
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
})

export default WhiteBox