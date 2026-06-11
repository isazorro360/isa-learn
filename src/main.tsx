import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { initMonitoring } from './services/monitoring';
import './index.css';

void initMonitoring();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found!');
}

console.log('Starting React render...');

try {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
  console.log('React render completed');
} catch (error) {
  console.error('React render error:', error);
  rootElement.innerHTML = `<div style="color: red; padding: 20px; font-family: monospace;"><h1>Error Loading App</h1><pre>${String(error)}</pre></div>`;
  throw error;
}
