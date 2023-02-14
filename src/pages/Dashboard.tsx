import React, {ChangeEvent, useRef} from 'react';
import axios from 'axios';
import {Box, SimpleGrid, Spinner, useToast} from '@chakra-ui/react';
import {TbCameraPlus} from 'react-icons/tb';
import {AiOutlineFileAdd} from 'react-icons/ai';
import {MdOutlineViewList} from 'react-icons/md';
import StatsCard from '../components/stats-card';
import {NumString} from '../utils/util.types';
import Fuse from 'fuse.js';
import {useNavigate} from 'react-router-dom';
import useLoaderHook from '../hooks/useLoaderHook';
import imageCompression from 'browser-image-compression';
import {IMAGE_COMPRESSION_OPTIONS} from '../constants/misc.constants';
import { getRelevantInfo, prettyFormatOCRData, toBase64 } from '../utils/misc.utils';

export interface DashboardProps {
}

const url = `https://hacket-mbox-vision.cognitiveservices.azure.com/vision/v3.2/ocr`
const gclURL = `https://vision.googleapis.com/v1/images:annotate`
const projID = 'hacket-344816'
const token = 'ya29.a0AVvZVsorw1xE0ULCGUimAfu8x3E92i6GpUsc-i3KSrA8oA1Sz4D3OJasau8Yq7GNtt_Hst5bhB15Mb-XHYDfjbmYgBa-XzcDSN2tAySF6BTxWv1qlBB7TJytbD4rwCCBELEEJrBG1tufRx0UELygdUjcGxSwIOAP1gw_lwaCgYKAc0SAQASFQGbdwaIn8t6udF1-qajNqOJRe6FkA0173'

const TestFunction = async (image: File) => {
	const blob = new Blob([image], {type: image.type})
  const base64Image = await toBase64(image);
	const gcl = await axios.post(gclURL, {
		requests: [
			{
				image: {
					content: base64Image 
				},
				features: [
					{
						type: 'TEXT_DETECTION'
					}
				]
			}
		]
	}, {
		headers: { Authorization: `Bearer ${token}`,
		'x-goog-user-project': projID,
		'Content-Type': 'application/json',
	}
	})
	// const response = await axios.post(url, blob,{
	// 	'params': {
	// 		language: 'unk',
	// 		detectOrientation: true,
	// 		'model-version': 'latest'
	// 	},
	// 	'headers': {
	// 		'Content-Type': 'application/octet-stream',
	// 		'Ocp-Apim-Subscription-Key': process.env.REACT_APP_OCR_KEY 
	// 	},
	// })
	// getRelevantInfo(prettyFormatOCRData(response.data))
	console.log(gcl)
}

export type DetectionResponse = ((NumString[])[])[]

export const Dashboard = (props: DashboardProps) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const navigate = useNavigate();
	const {isLoading, setIsLoading} = useLoaderHook();
	const handleAdditionClick = async () => {
		await inputRef.current?.click();
	};
	const toast = useToast();

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
		const queriedResult = result[0]?.refIndex || 0;
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
		if (uploadedFile) await TestFunction(uploadedFile);
		// if (uploadedFile) {
			// try {
				// let compressedFile = await imageCompression(uploadedFile, IMAGE_COMPRESSION_OPTIONS) as unknown as Blob;
				// compressedFile = new File([compressedFile], uploadedFile.name, {'type': compressedFile.type})
				// setIsLoading(true);
				// const formData = new FormData();
				// formData.append('file', compressedFile);
				// const response = await fetch('https://api.mbox.kongtsey.com/', {method: 'POST', body: formData});
				// const data = await response.json();
				// const extractedData = extractText(data);
				// const {journalNumber, cost} = findRelevantInfo(extractedData);
				// navigate('/add-record', {
					// state: {
						// journalNumber,
						// amount: cost
					// }
				// });
			// } catch (e: any) {
				// toast({title: e?.message || e, status: 'error', isClosable: true});
			// } finally {
				// setIsLoading(false);
			// }
		// }
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
					{isLoading && <div className={'spinner_overlay'}>
						<Spinner
							className={'spinner'}
							thickness="7px"
							speed="0.65s"
							emptyColor="gray.200"
							color="orange.500"
							size="xl"
						/>
					</div>}
				</SimpleGrid>
			</Box>
		</>
	);
};

export default Dashboard;
