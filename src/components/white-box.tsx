import { Container, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

interface WhiteBoxProps {
    children: React.ReactNode
}

export default function WhiteBox({ children }: WhiteBoxProps) {
  return (
    <Container
        maxW={'lg'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'xl'}
        rounded={'lg'}
        p={6}
    >
        {children}
    </Container>
  )
}
