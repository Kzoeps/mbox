import React from 'react';
import './App.css';
import {ChakraProvider} from '@chakra-ui/react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from './pages/Home';
import Navigation from './components/navigation';
import SignUp from './pages/Sign-Up';


function App() {
	return (
		<ChakraProvider>
			<BrowserRouter>
				<Navigation/>
				<Routes>
					<Route path={'/'} element={<HomePage/>}/>
					<Route path={'/sign-up'} element={<SignUp/>}/>
				</Routes>
			</BrowserRouter>
		</ChakraProvider>
	);
}

export default App;
