import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { InjectedConnector } from '@web3-react/injected-connector';

const rpcNetwork = 'matic-mumbai--rpc';
const poktRpcUrl = `https://poly-rpc.gateway.pokt.network/`;

export const WalletConnect = new WalletConnectConnector({
  rpcUrl: poktRpcUrl,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
});