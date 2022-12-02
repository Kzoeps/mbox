import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Button, Stack, Text } from '@chakra-ui/react'
import {UserContext} from './user-context';
import {getPaymentInfo} from '../api/misc.api';
import dayjs, {Dayjs} from 'dayjs';
import {useNavigate} from 'react-router-dom';

export interface PaymentBannerProps {
}

const getTrialText = (expiry: Dayjs, current: Dayjs): string => {
	let differenceText = '';
	const differenceDays = expiry.diff(current, 'd');
	const differenceHours = expiry.diff(current, 'h');
	differenceText = differenceDays ? `${differenceDays} ${differenceDays > 1 ? 'days' : 'day'}` : `${differenceHours} ${differenceHours > 1 ? 'hours' : 'hour'}`
	return `Your free trial ends in ${differenceText}, subscribe now to continue using mbox`;
}

const isInvalidPayment = (lastPayment: undefined | any) => {
	if (!lastPayment) return true;
	const latestPayment = dayjs(lastPayment.toDate())
	return dayjs().isAfter(latestPayment)
}

export const PaymentBanner = (props: PaymentBannerProps) => {
	const [showBanner, setShowBanner] = useState<boolean>(false);
	const [text, setText] = useState('');
	const {user} = useContext(UserContext);
	const navigate = useNavigate();

	const setDisplayText = useCallback((expiry: Dayjs, current: Dayjs, lastPayment: undefined | any) => {
		const isInvalid = isInvalidPayment(lastPayment);
		if (current.isBefore(expiry) && isInvalid) {
			setShowBanner(true);
			setText(getTrialText(expiry, current));
		} else if ([undefined, null].includes(lastPayment) && current.isAfter(expiry)) {
			setShowBanner(true);
			setText('Your free trial has ended, subscribe now to continue using mbox')
		} else if (lastPayment && isInvalid) {
			setShowBanner(true);
			setText('Your subscription has expired, subscribe again to continue using mbox')
		}
	}, [])

	useEffect(() => {
		const handleDisplay = async () => {
			if (user?.uid) {
				const paymentInfo = await getPaymentInfo(user.uid);
				// latest_payment is actually the last validity date for subscription
				const {expiry_date, latest_payment} = paymentInfo.data() as any;
				const expiryDate = dayjs(expiry_date.toDate());
				const currentDate = dayjs();
				setDisplayText(expiryDate, currentDate, latest_payment)
			}
		}
		void handleDisplay()
	}, [user?.uid, setDisplayText])
	if (!showBanner) { return null }
    return (
        <>
			<Stack p="4" boxShadow="md" borderRadius="sm">
				<Stack maxW="930px" direction="row" justify="space-around" alignItems="center">
					<Text fontSize="xl" fontWeight="semibold">{text}</Text>
					<Stack spacing="24px" direction={{ base: 'column', md: 'row' }}>
						<Button variant="outline" colorScheme="green">
							Dismiss
						</Button>
						<Button onClick={() => navigate('/subscribe')} colorScheme="green">Subscribe</Button>
					</Stack>
				</Stack>
			</Stack>
        </>
    )
}

export default PaymentBanner;
