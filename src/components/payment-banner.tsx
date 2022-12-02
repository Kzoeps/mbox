import React, {useContext, useEffect, useState} from 'react';
import {Button, Stack, Text } from '@chakra-ui/react'
import {UserContext} from './user-context';
import {getPaymentInfo} from '../api/misc.api';
import dayjs from 'dayjs';

export interface PaymentBannerProps {
}

export const PaymentBanner = (props: PaymentBannerProps) => {
	const [showBanner, setShowBanner] = useState<boolean>(false)
	const {user} = useContext(UserContext)
	const isInvalidPayment = (lastPayment: undefined | any) => {
		if (!lastPayment) return true;
		const latestPayment = dayjs(lastPayment.toDate())
		return dayjs().isAfter(latestPayment)
	}
	useEffect(() => {
		const handleDisplay = async () => {
			if (user?.uid) {
				const paymentInfo = await getPaymentInfo(user.uid);
				const {expiry_date, latest_payment} = paymentInfo.data() as any;
				const isInvalid = isInvalidPayment(latest_payment);
				const expiryDate = dayjs(expiry_date.toDate());
				const currentDate = dayjs();
				setShowBanner(currentDate.isAfter(expiryDate) && isInvalid)
			}
		}
		void handleDisplay()
	}, [user?.uid])
	if (!showBanner) { return null }
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
