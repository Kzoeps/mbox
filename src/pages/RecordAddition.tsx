import React from 'react';
import {Button, Flex, FormControl, FormLabel, Heading, Input, Stack} from '@chakra-ui/react';
import {useLocation} from 'react-router-dom';
import {Form, Formik} from 'formik';


export interface RecordAdditionProps {
}

export const RecordAddition = (props: RecordAdditionProps) => {
	const location = useLocation();
	const initialValues = {
		journalNumber: (location?.state as any)?.journalNumber ?? '',
		amount: (location?.state as any)?.amount ?? '',
		remarks: '',
		phoneNumber: ''
	};

	return (
		<>
			<Formik initialValues={initialValues} onSubmit={(vals) => console.log(vals)}>
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
										Add new record
									</Heading>
									<FormControl id="jrnl" isRequired>
										<FormLabel>Journal Number</FormLabel>
										<Input
											name="journalNumber"
											value={formik.values.journalNumber ?? ''}
											onChange={formik.handleChange}
											placeholder="8099920"
											_placeholder={{color: 'gray.500'}}
										/>
									</FormControl>
									<FormControl id="amount" isRequired>
										<FormLabel>Amount</FormLabel>
										<Input
											name={'amount'}
											value={formik.values.amount ?? ''}
											onChange={formik.handleChange}
											placeholder="1200"/>
									</FormControl>
									<FormControl id="phoneNumber">
										<FormLabel>Phone Number</FormLabel>
										<Input
											name={'phoneNumber'}
											value={formik.values.phoneNumber}
											onChange={formik.handleChange}
											placeholder="17562465"/>
									</FormControl>
									<FormControl id="remarks">
										<FormLabel>Remarks</FormLabel>
										<Input value={formik.values.remarks} name={'remarks'} onChange={formik.handleChange}/>
									</FormControl>
									<Stack spacing={6}>
										<Button
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
	);
};

export default RecordAddition;
