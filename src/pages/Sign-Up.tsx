import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	InputGroup,
	InputRightElement,
	Link,
	Stack,
	Text, useColorModeValue,
	useToast
} from '@chakra-ui/react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {Form, Formik} from 'formik';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {auth} from '../firebase.config';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import {FirebaseErrorCodesMessages} from '../utils/firebase-error-codes';
import useLoaderHook from '../hooks/useLoaderHook';
import dayjs from 'dayjs';
import {TrialProfile, SignUpForm} from '../types/misc.types';
import {updateUserProfile} from '../api/misc.api';

export default function SignUp() {
	const [showPassword, setShowPassword] = useState(false);
	const toast = useToast();
	const navigate = useNavigate();
	const {isLoading, setIsLoading} = useLoaderHook();
	const initialValue: SignUpForm = {
		firstName: '',
		lastName: '',
		email: '',
		password: ''

	};

	const getTrialDates = (): TrialProfile => {
		const start_date = dayjs()
		const expiry_date = dayjs().add(3, 'day')
		return {
			start_date: start_date.toDate(),
			phone_number: '',
			expiry_date: expiry_date.toDate()
		}
	}

	const handleOtpRequest = async (values: SignUpForm) => {
		const {firstName, lastName, email, password} = values;
		try {
			setIsLoading(true);
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			await updateProfile(userCredential.user, {displayName: `${firstName} ${lastName}`})
			await updateUserProfile(email, getTrialDates());
			setIsLoading(false);
			toast({
				title: 'Account created',
				description: 'We\'ve created your account for you',
				status: 'success',
				isClosable: true
			});
			navigate('/dashboard', {replace: true})
		} catch (e: any) {
			toast({
				title: 'Error occurred',
				description: FirebaseErrorCodesMessages[e?.code] || '',
				status: 'error'
			});
		} finally {
			setIsLoading(false)
		}
	};

	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50','gray.700')}>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'} textAlign={'center'}>
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

					<Formik initialValues={initialValue} onSubmit={async (values) => {
						await handleOtpRequest(values);
					}}>
						{(formik) => {
							return (
								<Form>

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
													<Input onChange={formik.handleChange} name="lastName" type="text"/>
												</FormControl>
											</Box>
										</HStack>
										<FormControl id="email" isRequired>
											<FormLabel>Email</FormLabel>
											<Input onChange={formik.handleChange} name="email" type="email"/>
										</FormControl>
										<FormControl id="password" isRequired>
											<FormLabel>Password</FormLabel>
											<InputGroup>
												<Input onChange={formik.handleChange} name="password"
													   type={showPassword ? 'text' : 'password'}/>
												<InputRightElement h={'full'}>
													<Button
														variant={'ghost'}
														onClick={() =>
															setShowPassword((showPassword) => !showPassword)
														}>
														{showPassword ? <ViewIcon/> : <ViewOffIcon/>}
													</Button>
												</InputRightElement>
											</InputGroup>
										</FormControl>
										<Stack spacing={10} pt={2}>
											<Button
												loadingText="Creating Account"
												isLoading={isLoading}
												size="lg"
												type="submit"
												bg={'blue.400'}
												color={'white'}
												id={'request-otp'}
												_hover={{
													bg: 'blue.500'
												}}>
												Create Account
											</Button>
										</Stack>
										<Stack pt={6}>
											<Text align={'center'}>
												Already a user? <Link as={RouterLink} to={`/sign-in`}
																	  color={'blue.400'}>Login</Link>
											</Text>
										</Stack>
									</Stack>
								</Form>
							);
						}}
					</Formik>
				</Box>

			</Stack>

		</Flex>
	);
}
