import React, {ReactNode, useContext} from 'react';
import './App.css';
import {ChakraProvider} from '@chakra-ui/react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from './pages/Home';
import Navigation from './components/navigation';
import SignUp from './pages/Sign-Up';
import './firebase.config';
import SignIn from './sign-in';
import Dashboard from './pages/Dashboard';
import RecordAddition from './pages/RecordAddition';
import UserContextProvider, {UserContext} from './components/user-context';
import RecordListing from './pages/RecordListing';
import UnauthenticatedRoutes from './components/unauthenticated-routes';

function ChakraProvided(props: {children: ReactNode}) {
	return (
		<ChakraProvider>
			{props.children}
		</ChakraProvider>
	)
}


function App() {
	return (
		// <ChakraProvider>
			<UserContextProvider>
				<BrowserRouter>
					<ChakraProvided><Navigation/></ChakraProvided>
					<Routes>
						<Route path={'/'} element={
							<ChakraProvided><HomePage/></ChakraProvided>}
						/>
						<Route path={'/sign-up'} element={
							<UnauthenticatedRoutes redirectPath={`/dashboard`}>
								<ChakraProvided><SignUp/></ChakraProvided>
							</UnauthenticatedRoutes>
						}

						/>
						<Route path={'/sign-in'} element={<ChakraProvided><SignIn/></ChakraProvided>}/>
						<Route path={'/dashboard'} element={<ChakraProvided><Dashboard/></ChakraProvided>}/>
						<Route path={'/add-record'} element={<ChakraProvided><RecordAddition/></ChakraProvided>}/>
						<Route path={'/records'} element={<RecordListing/>}/>
					</Routes>
				</BrowserRouter>
			</UserContextProvider>
		// </ChakraProvider>
	);
}

export default App;
