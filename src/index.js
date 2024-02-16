import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <ChakraProvider>
    <App />
    </ChakraProvider>
  </React.StrictMode>
);


export const server = "https://api.coingecko.com/api/v3";  //whenever we will import server use this variable then variable will be replaced with the value of this variable.