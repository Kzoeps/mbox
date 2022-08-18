import React, {ReactNode} from 'react';
import {Box, Flex, SimpleGrid, Stat, StatLabel, StatNumber, useColorModeValue} from '@chakra-ui/react';
import {TbCameraPlus} from 'react-icons/tb';
import {AiOutlineFileAdd} from 'react-icons/ai';
import {MdOutlineViewList} from 'react-icons/md';

export interface DashboardProps {
}

interface StatsCardProps {
	title?: string;
	stat: string;
	icon: ReactNode;
}

function StatsCard(props: StatsCardProps) {
	const {title, stat, icon} = props;
	return (
		<Stat
			px={{base: 2, md: 4}}
			py={'5'}
			shadow={'xl'}
			border={'1px solid'}
			borderColor={useColorModeValue('gray.800', 'gray.500')}
			rounded={'lg'}>
			<Flex justifyContent={'space-between'}>
				<Box pl={{base: 2, md: 4}}>
					{!!title && <StatLabel fontWeight={'medium'}>
						{title}
					</StatLabel>}
					<StatNumber fontSize={'2xl'} fontWeight={'medium'}>
						{stat}
					</StatNumber>
				</Box>
				<Box
					my={'auto'}
					color={useColorModeValue('gray.800', 'gray.200')}
					alignContent={'center'}>
					{icon}
				</Box>
			</Flex>
		</Stat>
	);
}

export const Dashboard = (props: DashboardProps) => {
	return (
		<>
			<Box maxW="7xl" mx={'auto'} pt={5} px={{base: 2, sm: 12, md: 17}}>
				<SimpleGrid columns={{base: 1, md: 3}} spacing={{base: 5, lg: 8}}>
					<StatsCard
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
				</SimpleGrid>
			</Box>
		</>
	);
};

export default Dashboard;
