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
	Text,
	useToast
} from '@chakra-ui/react';
import {useState} from 'react';
import {Form, Formik} from 'formik';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase.config';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import {FirebaseErrorCodesMessages} from '../utils/firebase-error-codes';

export interface SignUpForm {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export default function SignUp() {
	const [showPassword, setShowPassword] = useState(false);
	const toast = useToast();
	const [token, setToken] = useState<any>(undefined);
	const initialValue: SignUpForm = {
		firstName: '',
		lastName: '',
		email: '',
		password: ''

	};

	const handleOtpRequest = async (values: SignUpForm) => {
		const {email, password} = values;
		try {
			const response = await createUserWithEmailAndPassword(auth, email, password);
			toast({
				title: 'Account created',
				description: 'We\'ve created your account for you',
				status: 'success',
				isClosable: true
			});
		} catch (e: any) {
			toast({
				title: 'Error occurred',
				description: FirebaseErrorCodesMessages[e?.code] || '',
				status: 'error'
			});
		}
		/*		console.log('requested otp');
				const confirmation = await signInWithPhoneNumber(auth, `+975${phoneNumber}`, token);
				console.log(confirmation);
				console.log('done with sending');*/
	};

	return (
		<Formik initialValues={initialValue} onSubmit={async (values) => {
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
												loadingText="Submitting"
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
												Already a user? <Link color={'blue.400'}>Login</Link>
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
	);
}
