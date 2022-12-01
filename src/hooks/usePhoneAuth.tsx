import React, {useRef, useState} from 'react';
import {useToast} from '@chakra-ui/react';
import {RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth';
import {auth} from '../firebase.config';
import {formatPhoneNumber} from '../utils/misc.utils';

export interface UsePhoneAuthProps {
	recaptchaContainer?: string
}

export const usePhoneAuth = (props: UsePhoneAuthProps) => {
	const {recaptchaContainer} = props
	const [showCode, setShowCode]= useState(false);
	const confirmationRef = useRef<undefined | any>(undefined);
	const toast = useToast();

	const deliverCode = async (phoneNumber:string) => {
		try {
			let recaptchaVerifier = new RecaptchaVerifier(recaptchaContainer ||'recaptcha-container', {}, auth);
			const confirmationResult = await signInWithPhoneNumber(auth, formatPhoneNumber(phoneNumber), recaptchaVerifier);
			confirmationRef.current = confirmationResult;
			setShowCode(true)
			toast({title: 'OTP has been sent', status: 'success'})
		} catch (e: any) {
			toast({title: e?.message || 'An error occurred', status: 'error'});
		}
	}

	const verifyCode = async (code: number) => {
		if (confirmationRef.current) {
			try {
				return await confirmationRef.current.confirm(code)
			} catch (e: any) {
				toast({title: e?.message || e || 'an error occurred', status: 'error'});
				return undefined
			}
		}
	}

    return (
		{
			deliverCode,
			verifyCode,
			showCode
		}
    )
}

export default usePhoneAuth;
