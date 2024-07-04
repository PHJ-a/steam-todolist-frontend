import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

async function renderApp() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mock/browser.ts');
    await worker.start();
  }

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
  );

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

renderApp();
