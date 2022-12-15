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
import theme from './constants/theme';
import {createTheme, ThemeProvider} from '@mui/material';
import Pricing from './pages/Pricing';


const muiTheme = createTheme({});
function ChakraProvided(props: {children: ReactNode}) {
	return (
		<ChakraProvider theme={theme}>
			{props.children}
		</ChakraProvider>
	)
}


function App() {
	return (
		<UserContextProvider>
			<BrowserRouter>
				<ChakraProvided>
					<Navigation/>
					<PaymentBanner/>
					<Routes>
						<Route path={'/'} element={<HomePage/>}/>
						<Route element={<UnauthenticatedRoutes redirectPath={`/dashboard`}/>}>
							<Route path={'/email-in'} element={<SignIn/>}/>
							<Route path={'/sign-in'} element={<PhoneLogin/>}/>
							<Route path={'/email-up'} element={<SignUp/>}/>
							<Route path={'/sign-up'} element={<PhoneSignUp/>}/>
						</Route>
						<Route path={'/dashboard'} element={<Dashboard/>}/>
						<Route path={'/add-record'} element={<RecordAddition/>}/>
						<Route path={'/subscribe'} element={<Payment/>}/>
						<Route path={'/success'} element={<Success/>}/>
						<Route path={'/records'}
							   element={<ThemeProvider theme={muiTheme}><RecordListing/></ThemeProvider>}/>
						<Route path={'/pricing'} element={<Pricing/>}/>
					</Routes>
					<BottomNav/>
				</ChakraProvided>
			</BrowserRouter>
		</UserContextProvider>
	);
}

export default App;
