import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ChakraProvider } from '@chakra-ui/react';

// Correct usage of createRoot with StrictMode
const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </StrictMode>
);
