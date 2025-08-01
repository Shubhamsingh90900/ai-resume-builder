import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'; // Import the default export App
import ErrorBoundary from './common/Errorboundary.jsx';
import { ResumeProvider } from './context/ResumeContext.jsx';



const root = createRoot(document.getElementById('root'));
root.render(
  <ResumeProvider>
  <StrictMode>
    <ErrorBoundary>
      <App /> {/* Render App, which includes the router */}
    </ErrorBoundary>
  </StrictMode>
  </ResumeProvider>
);