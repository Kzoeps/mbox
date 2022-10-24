import React, {FC, useContext} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {UserContext} from './user-context';

export interface UnauthenticatedRoutesProps {
	// user?: undefined | any,
	redirectPath: string
	children?: React.ReactElement
}

export const UnauthenticatedRoutes: FC<UnauthenticatedRoutesProps> = ({children, redirectPath = '/'}): React.ReactElement => {
	const {user} = useContext(UserContext);
	if (user) {
		return <Navigate replace={true} to={redirectPath}/>
	}
   	return children ? children : <Outlet/>
}

export default UnauthenticatedRoutes;
