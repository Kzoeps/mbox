import React from 'react';
import './App.css';
import {ChakraProvider} from '@chakra-ui/react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from './pages/Home';
import Navigation from './components/navigation';


function App() {
	return (
		<ChakraProvider>
			<BrowserRouter>
				<Navigation/>
				<Routes>
					<Route path={'/'} element={<HomePage/>}/>
				</Routes>
			</BrowserRouter>
		</ChakraProvider>
	);
}

export default App;
