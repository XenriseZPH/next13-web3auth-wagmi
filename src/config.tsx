'use client';

/* eslint-disable import/no-anonymous-default-export */
import { bscTestnet, bsc, Chain } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from '@wagmi/core/providers/public';
import { CHAIN_NAMESPACES } from '@web3auth/base';

export const currentNetwork = Number(process.env.NEXT_PUBLIC_NETWORK) || 0;
export const blockchainNetwork = ['BSC - Testnet', 'BSC - Mainnet'];
export const config = [
  {
    api_url: 'https://stg-api.anitolegends.com/v2',
    supported_chains: [bscTestnet] as Chain[],
    providers: [publicProvider()],
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: '0x61',
      rpcTarget: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      displayName: 'Binance Smart Chain - Testnet',
      blockExplorer: 'https://testnet.bscscan.com/',
      ticker: 'tBNB',
      tickerName: 'Testnet BNB',
    },
  },
  {
    api_url: 'https://stg-api.anitolegends.com/v2',
    supported_chains: [bsc] as Chain[],
    providers: [publicProvider()],
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: '0x61',
      rpcTarget: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      displayName: 'Binance Smart Chain - Testnet',
      blockExplorer: 'https://testnet.bscscan.com/',
      ticker: 'tBNB',
      tickerName: 'Testnet BNB',
    },
  },
];

export default {
  project: 'next13_tailwindcss_with_connect_wallet',
  name: blockchainNetwork[currentNetwork],
  setting: config[currentNetwork],
  isTestnet: Number(currentNetwork) === 0,
};
