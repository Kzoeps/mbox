import React from "react";
import {RecordEntrySchema} from '../utils/validation-schemas';
import {Form, Formik} from 'formik';
import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
	Stack
} from '@chakra-ui/react';
import {ImListNumbered} from 'react-icons/im';
import {FaMoneyBillAlt} from 'react-icons/fa';
import {PhoneIcon} from '@chakra-ui/icons';
import {BiCommentAdd} from 'react-icons/bi';
import {MdOutlinePermIdentity} from 'react-icons/md';
import dayjs from 'dayjs';

export interface PaymentProps {
}

const INITIAL_VALUES = {
	name: '',
	journalNumber: '',
	amount: '',
	remarks: '',
	phoneNumber: '',
	date: ''
}

export const Payment = (props: PaymentProps) => {
	const formattedTodaysDate = dayjs().format(`YYYY-MM-DD`);
	return (
        <>
			<Formik initialValues={INITIAL_VALUES} validationSchema={RecordEntrySchema} onSubmit={(values) => {console.log(values)}}>
				{(formik) => {
					return (
						<Form>
							<Flex
								minH={'100vh'}
								align={'center'}
								justify={'center'}
								bg={'gray.50'}>
								<Stack
									spacing={4}
									w={'full'}
									maxW={'md'}
									bg={'white'}
									rounded={'xl'}
									boxShadow={'lg'}
									p={6}
									my={4}>
									<Heading lineHeight={1.1} fontSize={{base: '2xl', md: '3xl'}}>
										Submit Payment Details
									</Heading>
									<FormControl id="name" isRequired
												 isInvalid={!!formik.errors.journalNumber && !!formik.touched.journalNumber}>
										<FormLabel>Name</FormLabel>
										<InputGroup><InputLeftElement><MdOutlinePermIdentity/></InputLeftElement>
											<Input
												autoComplete={'off'}
												name="name"
												value={formik.values.name ?? ''}
												onChange={formik.handleChange}
												_placeholder={{color: 'gray.500'}}
											/></InputGroup>
										{formik.errors.journalNumber && formik.touched.journalNumber ?
											<FormErrorMessage>{formik.errors.journalNumber}</FormErrorMessage> : ''}
									</FormControl>
									<FormControl id="jrnl" isRequired
												 isInvalid={!!formik.errors.journalNumber && !!formik.touched.journalNumber}>
										<FormLabel>Journal Number</FormLabel>
										<InputGroup><InputLeftElement><ImListNumbered/></InputLeftElement>
											<Input
												autoComplete={'off'}
												name="journalNumber"
												value={formik.values.journalNumber ?? ''}
												onChange={formik.handleChange}
												_placeholder={{color: 'gray.500'}}
											/></InputGroup>
										{formik.errors.journalNumber && formik.touched.journalNumber ?
											<FormErrorMessage>{formik.errors.journalNumber}</FormErrorMessage> : ''}
									</FormControl>
									<FormControl id="amount" isRequired>
										<FormLabel>Amount</FormLabel>
										<InputGroup><InputLeftElement
										><FaMoneyBillAlt/></InputLeftElement>
											<Input
												autoComplete={'off'}
												name={'amount'}
												value={formik.values.amount ?? ''}
												onChange={formik.handleChange}
												placeholder="Please enter amount without Nu"/></InputGroup>
									</FormControl>
									<FormControl id="phoneNumber"
												 isInvalid={!!formik.errors.phoneNumber && !!formik.touched.phoneNumber}>
										<FormLabel>Phone Number</FormLabel>
										<InputGroup>
											<InputLeftElement>
												<PhoneIcon/>
											</InputLeftElement>
											<Input
												autoComplete={'off'}
												name={'phoneNumber'}
												value={formik.values.phoneNumber}
												onChange={formik.handleChange}/>
										</InputGroup>
										{formik.errors.phoneNumber && formik.touched.phoneNumber ?
											<FormErrorMessage>{formik.errors.phoneNumber}</FormErrorMessage> : ''}
									</FormControl>
									<FormControl id="remarks">
										<FormLabel>Remarks</FormLabel>
										<InputGroup>
											<InputLeftElement><BiCommentAdd/></InputLeftElement>
											<Input autoComplete={'off'} value={formik.values.remarks} name={'remarks'}
												   onChange={formik.handleChange}/></InputGroup>
									</FormControl>
									<FormLabel>Date</FormLabel>
									<input type="date" max={formattedTodaysDate}
										   value={formik.values.date as string}
										   name={'date'} onChange={formik.handleChange}
										   style={{
											   border: '1px solid #E2E8F0',
											   height: '40px',
											   padding: '0 16px'
										   }}/>
									<Stack spacing={6}>
										<Button
											isLoading={false}
											type={'submit'}
											bg={'blue.400'}
											color={'white'}
											_hover={{
												bg: 'blue.500'
											}}>
											Submit
										</Button>
									</Stack>
								</Stack>
							</Flex>
						</Form>
					);
				}}
			</Formik>
        </>
    )
}

export default Payment;
