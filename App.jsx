

import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './components/hooks/AuthContext';
import Body from './components/layout/Body';

// Initialize QueryClient
const queryClient = new QueryClient();

export default function App() {
  return (
    <MantineProvider defaultColorScheme="light" forceColorScheme="light">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Toaster />
          <Body />
        </AuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
}