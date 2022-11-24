import { Box, Heading, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useLocation } from 'react-router-dom';

export default function Success() {
	const location = useLocation()
	return (
		<Box textAlign="center" py={10} px={6}>
			<CheckCircleIcon boxSize={'50px'} color={'green.500'} />
			<Heading as="h2" size="xl" mt={6} mb={2}>
				{location.state.headline}
			</Heading>
			<Text color={'gray.500'}>
				{location.state.description}
			</Text>
		</Box>
	);
}
