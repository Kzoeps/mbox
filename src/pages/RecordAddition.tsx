import React, {useContext, useEffect, useState} from 'react';
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
	Stack, useColorMode,
	useToast
} from '@chakra-ui/react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Form, Formik} from 'formik';
import {BaseRecordInfo, MboxRecord} from '../types/misc.types';
import {addRecord, getRecordsTrackInfo, increaseRecordNumber} from '../api/misc.api';
import {UserContext} from '../components/user-context';
import dayjs, { Dayjs } from 'dayjs';
import useLoaderHook from '../hooks/useLoaderHook';
import {RecordEntrySchema} from '../utils/validation-schemas';
import {PhoneIcon} from '@chakra-ui/icons';
import {ImListNumbered} from 'react-icons/im';
import {FaMoneyBillAlt} from 'react-icons/fa'
import {BiCommentAdd} from 'react-icons/bi';
import {formatPhoneNumber} from '../utils/misc.utils';
import { DateFormats } from '../types/enums';


export interface RecordAdditionProps {
}

const getStringiDate = (date: Dayjs | undefined): string => {
    return date ? date.format(DateFormats.CalendarDate) : dayjs().format(DateFormats.CalendarDate);
}

export const RecordAddition = (props: RecordAdditionProps) => {
	const {colorMode} = useColorMode()
	const location = useLocation();
	const {user} = useContext(UserContext);
	const navigate = useNavigate();
  const [totalCount, setTotalCount] = useState(0);
	const {isLoading, setIsLoading} = useLoaderHook();
	const initialValues: MboxRecord = {
		journalNumber: (location?.state as BaseRecordInfo)?.journalNumber ?? '',
		amount: (location?.state as BaseRecordInfo)?.amount ?? '',
		remarks: (location?.state as BaseRecordInfo)?.remarks ?? '',
		phoneNumber: '',
		date: getStringiDate(location?.state?.date) 
	};
	const toast = useToast();

  

	const handleRecordAddition = async (values: MboxRecord) => {
		if (user) {
			setIsLoading(true);
			const phoneNumber = values.phoneNumber ? formatPhoneNumber(values.phoneNumber.toString()) : '';
			await addRecord(user.uid, {...values, phoneNumber, date: dayjs(values.date).toDate()});
			await increaseRecordNumber(user.uid, totalCount+1);
			setTotalCount(totalCount+1);
			setIsLoading(false);

			toast({
				title: 'Record added',
				description: `Record with jrnl no: ${values.journalNumber} has been successfully added`,
				status: 'success',
				isClosable: true
			});
			navigate(`/dashboard`)
		}
	};

	useEffect(() => {
		const getRecordsInfo = async () => {
			if (user?.uid) {
				const recordsInfoSnap = await getRecordsTrackInfo(user.uid);
				const recordsSnap = recordsInfoSnap.data();
				setTotalCount(recordsSnap?.recordsCount ?? 0);
			}
		};
		void getRecordsInfo();
	}, [user?.uid])

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
								bg={colorMode==='light' ? 'gray.50' : 'gray.700'}>
								<Stack
									spacing={4}
									w={'full'}
									maxW={'md'}
									bg={colorMode === 'light' ? 'white' : 'gray.500'}
									rounded={'xl'}
									boxShadow={'lg'}
									p={6}
									my={4}>
									<Heading lineHeight={1.1} fontSize={{base: '2xl', md: '3xl'}}>
										Add new record
									</Heading>
									<FormControl id="jrnl" isRequired
												 isInvalid={!!formik.errors.journalNumber && !!formik.touched.journalNumber}>
										<FormLabel>Journal Number</FormLabel>
										<InputGroup><InputLeftElement><ImListNumbered/></InputLeftElement>
											<Input
												autoComplete={'off'}
												name="journalNumber"
												value={formik.values.journalNumber ?? ''}
												onChange={formik.handleChange}
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
									<input type="date" max={getStringiDate(undefined)}
										   value={formik.values.date as string}
										   name={'date'} onChange={formik.handleChange}
										   style={{
											   border: '1px solid #E2E8F0',
											   height: '40px',
											   padding: '0 16px'
										   }}/>
									<Stack spacing={6}>
										<Button
											isLoading={isLoading}
											type={'submit'}
											bg={'orange.400'}
											color={'white'}
											_hover={{
												bg: 'orange.500'
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
