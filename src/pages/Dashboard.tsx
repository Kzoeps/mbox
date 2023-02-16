import React, {ChangeEvent, useRef} from 'react';
import {Box, SimpleGrid, Spinner, useToast} from '@chakra-ui/react';
import {TbCameraPlus} from 'react-icons/tb';
import {AiOutlineFileAdd} from 'react-icons/ai';
import {MdOutlineViewList} from 'react-icons/md';
import StatsCard from '../components/stats-card';
import {NumString} from '../utils/util.types';
import {useNavigate} from 'react-router-dom';
import useLoaderHook from '../hooks/useLoaderHook';
import imageCompression from 'browser-image-compression';
import {IMAGE_COMPRESSION_OPTIONS} from '../constants/misc.constants';
import { extractOCRData} from '../utils/misc.utils';
import { readScreenShot } from '../api/misc.api';

export interface DashboardProps {
}



export type DetectionResponse = ((NumString[])[])[]

export const Dashboard = (props: DashboardProps) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const navigate = useNavigate();
	const {isLoading, setIsLoading} = useLoaderHook();
	const handleAdditionClick = async () => {
		inputRef.current?.click();
	};
	const toast = useToast();

	const handleFileSelection = async (event: ChangeEvent<HTMLInputElement>) => {
		const uploadedFile = event?.target?.files?.[0];
		if (uploadedFile) {
		try {
        let compressedFile = await imageCompression(uploadedFile, IMAGE_COMPRESSION_OPTIONS) as unknown as Blob;
				compressedFile = new File([compressedFile], uploadedFile.name, {'type': compressedFile.type})
				setIsLoading(true);
        const rawText = await readScreenShot(compressedFile as File); 
				const extractedData = extractOCRData(rawText);
				navigate('/add-record', {
					state: extractedData
        });
			} catch (e: any) {
				toast({title: e?.message || e, status: 'error', isClosable: true});
			} finally {
				setIsLoading(false);
			}
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
