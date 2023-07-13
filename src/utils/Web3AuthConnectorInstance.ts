// Web3Auth Libraries
import { Web3Auth } from '@web3auth/modal';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { TorusWalletConnectorPlugin } from '@web3auth/torus-wallet-connector-plugin';
import { Chain } from 'wagmi';
import { Web3AuthConnector } from './connector';
import CONFIG from '@/config';

export default function Web3AuthConnectorInstance(chains: Chain[]) {
  // Create Web3Auth Instance
  const name = 'Web3Auth Wagmi';

  const iconUrl = 'https://web3auth.io/images/w3a-L-Favicon-1.svg';

  // Initiate Web3Auth
  const web3AuthInstance = new Web3Auth({
    clientId: process.env.NEXT_PUBLIC_CLIENTID, // Get your Client ID from Web3Auth Dashboard
    chainConfig: CONFIG.setting.chainConfig,
    uiConfig: {
      appName: name,
      theme: 'light',
      loginMethodsOrder: ['google', 'facebook'],
      defaultLanguage: 'en',
      appLogo: iconUrl, // Your App Logo Here
      modalZIndex: '2147483647',
    },
    enableLogging: true,
  });

  // Ethereum Provider
  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig: CONFIG.setting.chainConfig },
  });

  // Create openlogin adapter
  const openloginAdapterInstance = new OpenloginAdapter({
    privateKeyProvider,
    adapterSettings: {
      network: 'cyan',
      uxMode: 'popup',
      whiteLabel: {
        name: name,
        logoLight: 'https://web3auth.io/images/w3a-L-Favicon-1.svg',
        logoDark: 'https://web3auth.io/images/w3a-D-Favicon-1.svg',
        defaultLanguage: 'en',
        dark: true, // whether to enable dark mode. defaultValue: false
      },
    },
  });

  web3AuthInstance.configureAdapter(openloginAdapterInstance);

  // Add Torus Wallet Plugin (optional)
  const torusPlugin = new TorusWalletConnectorPlugin({
    torusWalletOpts: {
      buttonPosition: 'bottom-left',
    },
    walletInitOptions: {
      whiteLabel: {
        theme: {
          isDark: false,
          colors: {
            primary: '#00a8ff',
          },
        },
        logoDark: iconUrl,
        logoLight: iconUrl,
      },
      useWalletConnect: false,
      enableLogging: true,
    },
  });

  return new Web3AuthConnector({
    chains: chains as any,
    options: {
      web3AuthInstance,
      torusPlugin,
    },
  });
}
