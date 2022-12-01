import React from 'react';
import {Form, Formik} from 'formik';
import {Box, Button, Flex, Heading, Link, Stack, Text} from '@chakra-ui/react';
import {Link as RouterLink} from 'react-router-dom';
import PhoneAuthForm from '../components/phone-auth-form';
import usePhoneAuth from '../hooks/usePhoneAuth';
import {BASE_PHONE_LOGIN} from '../constants/misc.constants';
import {LoginSchemaFinal, LoginSchemaInit} from '../utils/validation-schemas';
import {PhoneSignUpForm} from '../types/misc.types';
import useLoaderHook from '../hooks/useLoaderHook';

export interface PhoneLoginProps {
}

type PhoneLoginForm = Pick<PhoneSignUpForm, 'phoneNumber' | 'verificationCode'>;

export const PhoneLogin = (props: PhoneLoginProps) => {
	const initialValues = BASE_PHONE_LOGIN;
	const {deliverCode, showCode, verifyCode} = usePhoneAuth({})
	const {isLoading, wrapperBhai} = useLoaderHook()

	const handleDelivery = async (values: PhoneLoginForm) => {
		await deliverCode(values.phoneNumber)
	}

	const handleConfirmation = async ( values: PhoneLoginForm) => {
		const wrappedVerify = wrapperBhai(verifyCode);
		await wrappedVerify(+values.verificationCode);
	}
	return (
		<>
			<Formik initialValues={initialValues} validationSchema={showCode ? LoginSchemaFinal : LoginSchemaInit} onSubmit={async (values) => {
				showCode ?  await handleConfirmation(values): await handleDelivery(values) ;
			}}>
				{(formik) => {
					return (
						<Form>
							<Flex
								minH={'100vh'}
								align={'center'}
								justify={'center'}
								bg={'gray.50'}>
								<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
									<Stack align={'center'}>
										<Heading fontSize={'4xl'} textAlign={'center'}>
											Welcome Back! Sign In
										</Heading>
										<Text fontSize={'lg'} color={'gray.600'}>
											to enjoy all of our cool features ✌️
										</Text>
									</Stack>
									<Box
										rounded={'lg'}
										bg={'white'}
										boxShadow={'lg'}
										p={8}>
										<Stack spacing={4}>
											<PhoneAuthForm formik={formik} showCode={showCode}/>
											<Stack spacing={10} pt={2}>
												<Button
													loadingText="Submitting"
													isLoading={isLoading}
													size="lg"
													type="submit"
													bg={'blue.400'}
													color={'white'}
													id={'request-otp'}
													_hover={{
														bg: 'blue.500'
													}}>
													Login
												</Button>
											</Stack>
											<Stack pt={6}>
												<Text align={'center'}>
													Dont have an account? <Link as={RouterLink} to={`/sign-up`}
																				color={'blue.400'}>Sign Up</Link>
												</Text>
											</Stack>
										</Stack>
									</Box>
								</Stack>
							</Flex>
						</Form>
					);
				}}
			</Formik>
		</>
	);
};

export default PhoneLogin;
