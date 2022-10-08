import React, {useState} from 'react';
import {Form, Formik} from 'formik';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Link,
	Stack,
	Text,
	useToast
} from '@chakra-ui/react';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import {auth} from './firebase.config';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {FirebaseErrorCodesMessages} from './utils/firebase-error-codes';
import useLoaderHook from './hooks/useLoaderHook';

export interface SignInProps {
}

export interface SignInForm {
	email: string;
	password: string;
}

export const SignIn = (props: SignInProps) => {
	const [showPassword, setShowPassword] = useState(false);
	const toast = useToast();
	const {isLoading, wrapperBhai, setIsLoading} = useLoaderHook();
	const navigate = useNavigate();
	const initialValue = {
		email: '',
		password: ''
	};

	const handleLogin = async (values: SignInForm) => {
		const {email, password} = values;
		try {
			const wrappedSignIn = wrapperBhai(signInWithEmailAndPassword);
			await wrappedSignIn(auth, email, password);
			toast({
				title: 'Logged in',
				status: 'success',
				isClosable: true
			});
			navigate('/dashboard', {replace: true})
		} catch (e: any) {
			console.error(e);
			toast({
				title: 'Error occurred',
				description: FirebaseErrorCodesMessages[e?.code] || '',
				status: 'error'
			});
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<>
			<Formik initialValues={initialValue} onSubmit={async (values) => {
				await handleLogin(values);
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

export default SignIn;
