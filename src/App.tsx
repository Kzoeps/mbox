import React, {ReactNode} from 'react';
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
import UserContextProvider from './components/user-context';
import RecordListing from './pages/RecordListing';
import UnauthenticatedRoutes from './components/unauthenticated-routes';
import BottomNav from './components/bottom-nav';
import Payment from './pages/Payment';
import Success from './pages/Success';
import PhoneSignUp from './pages/Phone-Sign-Up';
import PhoneLogin from './pages/Phone-Login';
import PaymentBanner from './components/payment-banner';

function ChakraProvided(props: {children: ReactNode}) {
	return (
		<ChakraProvider>
			{props.children}
		</ChakraProvider>
	)
}


function App() {
	return (
			<UserContextProvider>
				<BrowserRouter>
					<ChakraProvided><Navigation/></ChakraProvided>
					<ChakraProvided><PaymentBanner/></ChakraProvided>
					<Routes>
						<Route path={'/'} element={<ChakraProvided><HomePage/></ChakraProvided>}/>
						<Route element={<UnauthenticatedRoutes redirectPath={`/dashboard`}/>}>
							<Route path={'/email-in'} element={<ChakraProvided><SignIn/></ChakraProvided>}/>
							<Route path={'/sign-in'} element={<ChakraProvided><PhoneLogin/></ChakraProvided>}/>
							<Route path={'/email-up'} element={<ChakraProvided><SignUp/></ChakraProvided>}/>
							<Route path={'/sign-up'} element={<ChakraProvided><PhoneSignUp/></ChakraProvided>}/>
						</Route>
						<Route path={'/dashboard'} element={<ChakraProvided><Dashboard/></ChakraProvided>}/>
						<Route path={'/add-record'} element={<ChakraProvided><RecordAddition/></ChakraProvided>}/>
						<Route path={'/subscribe'} element={<ChakraProvided><Payment/></ChakraProvided>}/>
						<Route path={'/success'} element={<ChakraProvided><Success/></ChakraProvided>}/>
						<Route path={'/records'} element={<RecordListing/>}/>
					</Routes>
					<ChakraProvided>
						<BottomNav/>
					</ChakraProvided>
				</BrowserRouter>
			</UserContextProvider>
	);
}

export default App;
