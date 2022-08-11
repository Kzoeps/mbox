import React from 'react';
import './App.css';
import {ChakraProvider} from '@chakra-ui/react';
import {BrowserRouter} from 'react-router-dom';
import HomePage from './pages/Home';


function App() {
	return (
		<ChakraProvider>
			<BrowserRouter>
				<HomePage/>
			</BrowserRouter>
		</ChakraProvider>
	);
}

export default App;
