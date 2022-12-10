import React from 'react';
import {Form, Formik} from 'formik';
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	Link,
	Stack,
	Text,
	useToast
} from '@chakra-ui/react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {updateProfile} from 'firebase/auth';
import {updateUserProfile} from '../api/misc.api';
import {getTrialDates} from '../utils/misc.utils';
import {PhoneSignUpForm} from '../types/misc.types';
import {PHONE_SIGN_UP} from '../constants/misc.constants';
import {InitSignUpSchema, SignUpSchema} from '../utils/validation-schemas';
import PhoneAuthForm from '../components/phone-auth-form';
import usePhoneAuth from '../hooks/usePhoneAuth';

export interface PhoneSignUpProps{
}

export const PhoneSignUp = (props: PhoneSignUpProps) => {
	const initialValue: PhoneSignUpForm = PHONE_SIGN_UP;
	const navigate = useNavigate();
	const toast = useToast();
	const {deliverCode, showCode, verifyCode} = usePhoneAuth({});

	const handleDelivery = async (vals: PhoneSignUpForm) => {
		await deliverCode(vals.phoneNumber);
	};

	const verifyOtp = async (vals: PhoneSignUpForm) => {
		try {
			const userCredentials = await verifyCode(+vals.verificationCode);
			if (userCredentials) {
				await handleProfileGeneration(vals, userCredentials.user);
				toast({
					title: 'Account created',
					description: 'We\'ve created your account for you',
					status: 'success',
					isClosable: true
				});
				navigate('/dashboard', {replace: true});
			}
		} catch (e: any) {
			toast({title: e?.message || e || 'an error occurred', status: 'error'});
		}
	};

	const handleProfileGeneration = async (formVals: PhoneSignUpForm, user: any) => {
		const {firstName, lastName} = formVals;
		const displayName = `${firstName.trim()} ${lastName.trim()}`;
		await updateProfile(user, {displayName});
		await updateUserProfile(user.uid, getTrialDates());
	};

	const handleOtpRequest = async (vals: PhoneSignUpForm) => {
		showCode ? await verifyOtp(vals) : await handleDelivery(vals);
	};
	return (
		<>
			<Formik initialValues={initialValue} validationSchema={showCode ? SignUpSchema : InitSignUpSchema} onSubmit={async (values) => {
				await handleOtpRequest(values);
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
										<Heading color={'orange.400'} fontSize={'4xl'} textAlign={'center'}>
											Sign up
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
											<HStack>
												<Box>
													<FormControl id="firstName" isRequired>
														<FormLabel>First Name</FormLabel>
														<Input onChange={formik.handleChange} name={'firstName'}
															   type="text"/>
													</FormControl>
												</Box>
												<Box>
													<FormControl id="lastName">
														<FormLabel>Last Name</FormLabel>
														<Input onChange={formik.handleChange} name="lastName"
															   type="text"/>
													</FormControl>
												</Box>
											</HStack>
											<PhoneAuthForm formik={formik} showCode={showCode}/>
											<div id="recaptcha-container"/>
											<Stack spacing={10} pt={2}>
												<Button
													loadingText="Creating Account"
													isLoading={false}
													size="lg"
													type="submit"
													bg={'orange.400'}
													color={'white'}
													id={'request-otp'}
													_hover={{
														bg: 'orange.500'
													}}>
													{showCode ? 'Confirm' : 'Send Code'}
												</Button>
											</Stack>
											<Stack pt={6}>
												<Text align={'center'}>
													Already a user? <Link as={RouterLink} to={`/sign-in`}
																		  color={'orange.400'}>Login</Link>
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

export default PhoneSignUp;
