import React from 'react';
import {Box, Flex} from '@chakra-ui/react';

export interface DemoProps {
}

export const Demo = (props: DemoProps) => {
	return (
		<><Flex align={'center'}>
			<Box margin={'auto'} mt={'50px'}>
				<iframe width="380" height="214" src="https://www.youtube.com/embed/ZKuPPIvcocs"
						title="YouTube video player" frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowFullScreen/>
			</Box>
		</Flex>
		</>
	);
};

export default Demo;
