
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Provider } from 'react-redux';
import { store } from './store/store.js'; 
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
    </Provider>
  </StrictMode>,
);