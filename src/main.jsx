import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel/dist/owl.carousel.js';
import 'owl.carousel';
import { ChakraProvider, defaultSystem } from '@chakra-ui/provider';

const theme = {
  // ... your system-ui theme
  config: {
    useSystemColorMode: false, // or true
    initialColorMode: "light", // or "dark"
    cssVarPrefix: "chakra", // any string
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Router>
  </StrictMode>,
)
