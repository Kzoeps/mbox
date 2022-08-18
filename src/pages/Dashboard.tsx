import React, {useRef} from 'react';
import {Box, SimpleGrid} from '@chakra-ui/react';
import {TbCameraPlus} from 'react-icons/tb';
import {AiOutlineFileAdd} from 'react-icons/ai';
import {MdOutlineViewList} from 'react-icons/md';
import StatsCard from '../components/stats-card';

export interface DashboardProps {
}

export const Dashboard = (props: DashboardProps) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const handleAdditionClick = () => {
		inputRef.current?.click();
	}
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
						stat={'View Records'}
						icon={<MdOutlineViewList size={'3em'}/>}
					/>
					<StatsCard
						stat={'Add Record'}
						icon={<AiOutlineFileAdd size={'3em'}/>}
					/>
					<input ref={inputRef} style={{display: 'none'}} type="file" accept="image/*" capture={true}/>
				</SimpleGrid>
			</Box>
		</>
	);
};

export default Dashboard;
