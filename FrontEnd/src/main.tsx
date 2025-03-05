import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {BrowserRouter } from 'react-router-dom'
import {APIProvider} from '@vis.gl/react-google-maps';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_PUBLISHABLE_KEY;
const queryClient = new QueryClient();

if(!PUBLISHABLE_KEY){
  throw new Error("Missing publishable key")
}


createRoot(document.getElementById('root')!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <APIProvider apiKey={GOOGLE_API_KEY} onLoad={() => console.log("apiKey loaded")}>
         <App />
        </APIProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </ClerkProvider>

)
