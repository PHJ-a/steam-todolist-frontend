import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AuthContextProvider } from './context/AuthContext.tsx';

async function renderApp() {
  if (
    process.env.NODE_ENV === 'development' &&
    import.meta.env.VITE_USE_MOCK === 'true'
  ) {
    const { worker } = await import('./mock/browser.ts');
    await worker.start();
  }

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
  );

  root.render(
    <React.StrictMode>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </React.StrictMode>,
  );
}

renderApp();
