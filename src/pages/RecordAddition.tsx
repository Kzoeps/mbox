import React, {useContext, useEffect, useState} from 'react';
import {Button, Flex, FormControl, FormLabel, Heading, Input, Stack, useToast} from '@chakra-ui/react';
import {useLocation} from 'react-router-dom';
import {Form, Formik} from 'formik';
import {Record} from '../types/misc.types';
import {addRecord, getRecordsTrackInfo, increaseRecordNumber} from '../api/misc.api';
import {UserContext} from '../components/user-context';
import dayjs from 'dayjs';
import useLoaderHook from '../hooks/useLoaderHook';
import { RecordEntrySchema } from '../utils/firebase-error-codes';


export interface RecordAdditionProps {
}

export const RecordAddition = (props: RecordAdditionProps) => {
	const location = useLocation();
	const {user} = useContext(UserContext);
	const {isLoading, setIsLoading} = useLoaderHook();
	const [totalCount, setTotalCount] = useState(0);
	const formattedTodaysDate = dayjs().format(`YYYY-MM-DD`);
	const initialValues: Record = {
		journalNumber: (location?.state as any)?.journalNumber ?? '',
		amount: (location?.state as any)?.amount ?? '',
		remarks: '',
		phoneNumber: '',
		date: formattedTodaysDate
	};
	const toast = useToast();

	const handleRecordAddition = async (values: Record) => {
		if (user) {
			setIsLoading(true);
			const phoneNumber = values.phoneNumber ? `+975${values.phoneNumber}` : '';
			await addRecord(user.email, {...values, phoneNumber, date: dayjs(values.date).toDate()});
			await increaseRecordNumber(user.email, totalCount+1);
			setTotalCount(totalCount+1);
			setIsLoading(false);

			toast({
				title: 'Record added',
				description: `Record with jrnl no: ${values.journalNumber} has been successfully added`,
				status: 'success',
				isClosable: true
			});
		}
	};

	useEffect(() => {
		const getRecordsInfo = async () => {
			const recordsInfoSnap = await getRecordsTrackInfo(user.email);
			const recordsSnap = recordsInfoSnap.data();
			setTotalCount(recordsSnap?.recordsCount ?? 0);
		}
		void getRecordsInfo()
	}, [user.email])

	return (
		<>
			<Formik initialValues={initialValues} validationSchema={RecordEntrySchema} onSubmit={handleRecordAddition}>
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
											autoComplete={"off"}
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
											autoComplete={"off"}
											name={'amount'}
											value={formik.values.amount ?? ''}
											onChange={formik.handleChange}
											placeholder="Please enter amount without Nu"/>
									</FormControl>
									<FormControl id="phoneNumber">
										<FormLabel>Phone Number</FormLabel>
										<Input
											autoComplete={"off"}
											name={'phoneNumber'}
											value={formik.values.phoneNumber}
											onChange={formik.handleChange}
											placeholder="17562465"/>
									</FormControl>
									<FormControl id="remarks">
										<FormLabel>Remarks</FormLabel>
										<Input autoComplete={"off"} value={formik.values.remarks} name={'remarks'}
											   onChange={formik.handleChange}/>
									</FormControl>
									<input type="date" max={formattedTodaysDate} value={formik.values.date as string}
										   name={'date'} onChange={formik.handleChange}
										   style={{border: '1px solid #E2E8F0', height: '40px', padding: '0 16px'}}/>
									<Stack spacing={6}>
										<Button
											isLoading={isLoading}
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
