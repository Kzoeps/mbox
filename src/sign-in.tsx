import React, {useState} from 'react';
import {Form, Formik} from 'formik';
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
	Text
} from '@chakra-ui/react';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';

export interface SignInProps {
}

export interface SignInForm {
	email: string;
	password: string;
}

export const SignIn = (props: SignInProps) => {
	const [showPassword, setShowPassword] = useState(false);
	const initialValue = {
		email: '',
		password: ''
	};

	const handleLogin = async (values: SignInForm) => {
		console.log(values);
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
													Dont have an account? <Link color={'blue.400'}>Sign Up</Link>
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
