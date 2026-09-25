import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initLanguageManager } from './utils/languageManager';

// Initialize language preferences and RTL/LTR direction attributes
initLanguageManager();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
