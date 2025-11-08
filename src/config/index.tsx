import { cookieStorage, createStorage } from '@wagmi/core';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet, arbitrum } from '@reown/appkit/networks';

// Ensure you set NEXT_PUBLIC_PROJECT_ID in your .env.local file
export const projectId = "cd169b99d42633d1d81f5aee613d0eed";

if (!projectId) {
  throw new Error('Project ID is not defined. Please set NEXT_PUBLIC_PROJECT_ID in your .env.local file');
}

// Define the networks you want to support
export const networks = [mainnet, arbitrum];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage // Use cookie storage for SSR
  }),
  ssr: true,
  projectId,
  networks
});

export const config = wagmiAdapter.wagmiConfig;