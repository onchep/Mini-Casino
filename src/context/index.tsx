'use client'

import { wagmiAdapter, projectId, networks } from '@/config/index'; // Adjust path if config is not in root
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit/react';
import { mainnet } from '@reown/appkit/networks';
import React, { type ReactNode } from 'react';
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi';

// Set up queryClient
const queryClient = new QueryClient();

if (!projectId) {
  throw new Error('Project ID is not defined');
}

// Set up your app's metadata
const metadata = {
  name: 'minicasino', // Your app's name
  description: 'Mini Casino', // Your app's description
  url: 'https://www.game.com', // Your app's URL
  icons: ['https://avatars.githubusercontent.com/u/179229932'] // Your app's icon
};

// Create the Reown AppKit modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet], // Use networks from your config
  defaultNetwork: mainnet,
  metadata: metadata,
  features: {
    analytics: true
  }
});

// Create the main context provider component
function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  // Get initial state from cookies for SSR
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies);
  
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;