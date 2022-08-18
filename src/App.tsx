import React from 'react';
import './App.css';
import {ChakraProvider} from '@chakra-ui/react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from './pages/Home';
import Navigation from './components/navigation';
import SignUp from './pages/Sign-Up';
import './firebase.config';
import SignIn from './sign-in';
import Dashboard from './pages/Dashboard';


function App() {
	return (
		<ChakraProvider>
			<BrowserRouter>
				<Navigation/>
				<Routes>
					<Route path={'/'} element={<HomePage/>}/>
					<Route path={'/sign-up'} element={<SignUp/>}/>
					<Route path={'/sign-in'} element={<SignIn/>}/>
					<Route path={'/dashboard'} element={<Dashboard/>}/>
				</Routes>
			</BrowserRouter>
		</ChakraProvider>
	);
}

export default App;
