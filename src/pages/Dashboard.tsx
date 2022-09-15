import React, {ChangeEvent, useRef} from 'react';
import {Box, SimpleGrid, Spinner} from '@chakra-ui/react';
import {TbCameraPlus} from 'react-icons/tb';
import {AiOutlineFileAdd} from 'react-icons/ai';
import {MdOutlineViewList} from 'react-icons/md';
import StatsCard from '../components/stats-card';
import {NumString} from '../utils/util.types';
import Fuse from 'fuse.js';
import {useNavigate} from 'react-router-dom';
import useLoaderHook from '../hooks/useLoaderHook';

export interface DashboardProps {
}

export type DetectionResponse = ((NumString[])[])[]

export const Dashboard = (props: DashboardProps) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const navigate = useNavigate();
	const {isLoading, setIsLoading, wrapperBhai} = useLoaderHook();
	const handleAdditionClick = async () => {
		await inputRef.current?.click();
	};

	const extractText = (data: DetectionResponse): string[] => {
		return data.map((element) => element?.[1]?.[0]) as string[];
	};

	const findJournalNumber = (data: string[], journalIndex: number) => {
		const possibilities: { value: NumString, distance: number }[] = [];
		data.forEach((piece, index) => {
			if (!isNaN(+piece)) {
				possibilities.push({
					value: piece,
					distance: Math.abs(journalIndex - index)
				});
			}
		});
		if (!possibilities.length) {
			return data[journalIndex + 1];
		}
		return possibilities.sort(({distance: firstDistance}, {distance: secondDistance}) => {
			if (firstDistance > secondDistance) {
				return 1;
			} else if (firstDistance < secondDistance) {
				return -1;
			} else {
				return 0;
			}
		})[0].value;
	};

	const findRelevantInfo = (data: string[]): { journalNumber: NumString, cost: string } => {
		const searcher = new Fuse(data);
		const result = searcher.search('Jrnl');
		const queriedResult = result[0].refIndex;
		const journalNumber = findJournalNumber(data, queriedResult);
		let cost = searcher.search('Nu.')?.[0]?.item;
		if (cost) {
			const justCost = cost.split(' ')?.[1];
			cost = justCost ?? cost;
		}
		return {journalNumber, cost};
	};

	const handleFileSelection = async (event: ChangeEvent<HTMLInputElement>) => {
		const uploadedFile = event?.target?.files?.[0];
		if (uploadedFile) {
			setIsLoading(true);
			const formData = new FormData();
			formData.append('file', uploadedFile);
			const response = await fetch('https://hacket-mbox.ml', {method: 'POST', body: formData});
			const data = await response.json();
			const extractedData = extractText(data);
			const {journalNumber, cost} = findRelevantInfo(extractedData);
			setIsLoading(false);
			navigate('/add-record', {
				state: {
					journalNumber,
					amount: cost
				}
			});
		}
	};

	return (
		<>
			<Box maxW="7xl" mx={'auto'} pt={5} px={{base: 2, sm: 12, md: 17}}>
				<SimpleGrid columns={{base: 1, md: 3}} spacing={{base: 5, lg: 8}}>
					<StatsCard
						onClick={handleAdditionClick}
						stat={'Capture Record'}
						icon={<TbCameraPlus size={'3em'}/>}
					/>
					<StatsCard
						onClick={() => navigate(`/records`)}
						stat={'View Records'}
						icon={<MdOutlineViewList size={'3em'}/>}
					/>
					<StatsCard
						onClick={() => navigate(`/add-record`)}
						stat={'Add Record'}
						icon={<AiOutlineFileAdd size={'3em'}/>}
					/>
					<input onChange={handleFileSelection} ref={inputRef} style={{display: 'none'}} type="file"
						   accept="image/*" capture={true}/>
					<div className={'spinner_overlay'}>
						<Spinner
							className={'spinner'}
							thickness="7px"
							speed="0.65s"
							emptyColor="gray.200"
							color="orange.500"
							size="xl"
						/>
					</div>
				</SimpleGrid>
			</Box>
		</>
	);
};

export default Dashboard;
