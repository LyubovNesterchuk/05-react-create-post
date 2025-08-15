import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import 'modern-normalize';

import './global.css';
import App from './components/App/App.tsx';

const queryClient=new QueryClient();

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}> 
       <App />
       <ReactQueryDevtools/>
    </QueryClientProvider>
  </StrictMode>,
)
