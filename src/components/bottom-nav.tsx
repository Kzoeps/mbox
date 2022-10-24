import React, {useEffect, useState} from 'react';
import {Tab, TabList, Tabs} from '@chakra-ui/react';
import useCurrentPath from '../hooks/useCurrentPath';
import {useNavigate} from 'react-router-dom';
import {INDEX_LOCATION, LOCATION_INDEX_MAP} from '../constants/misc.constants';

export interface BottomNavProps {
}

export const BottomNav = (props: BottomNavProps) => {
	const location = useCurrentPath();
	const navigate = useNavigate()
	const [tabIndex, setTabIndex] = useState<number>(0);
	useEffect(() => {
		if (location) {
			setTabIndex(LOCATION_INDEX_MAP[location]);
		}
	}, [location]);
	return (
		<>
			<Tabs onChange={(index) => navigate(INDEX_LOCATION[index])} index={tabIndex} style={{position: 'fixed', bottom: 0, width: '100%'}} isFitted variant="unstyled">
				<TabList>
					<Tab _selected={{color: 'white', bg: 'orange.500'}}>Dashboard</Tab>
					<Tab _selected={{color: 'white', bg: 'orange.500'}}>Add Record</Tab>
					<Tab _selected={{color: 'white', bg: 'orange.500'}}>View Record</Tab>
				</TabList>
			</Tabs>
		</>
	);
};

export default BottomNav;
