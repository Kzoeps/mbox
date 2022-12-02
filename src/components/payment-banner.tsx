import React from "react";
import {Button, Stack, Text } from '@chakra-ui/react'

export interface PaymentBannerProps {
}

export const PaymentBanner = (props: PaymentBannerProps) => {
    return (
        <>
			<Stack p="4" boxShadow="md" borderRadius="sm">
				<Stack maxW="930px" direction="row" justify="space-around" alignItems="center">
					<Text fontSize="xl" fontWeight="semibold">Your free trial ends in 2 days, subscribe now to continue using mbox</Text>
					<Stack spacing="24px" direction={{ base: 'column', md: 'row' }}>
						<Button variant="outline" colorScheme="green">
							Dismiss
						</Button>
						<Button colorScheme="green">Subscribe</Button>
					</Stack>
				</Stack>
			</Stack>
        </>
    )
}

export default PaymentBanner;
