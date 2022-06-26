// @ts-nocheck
import * as React from "react";
import { Tabs, Tab, Typography, Box, Button, Stack } from "@mui/material";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router'
import Image from 'next/image'

   const WalletConnect = new WalletConnectConnector({
    rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
   });

   const Injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42]
   });

export default function Wallet() {
    const router = useRouter()

    const { active, chainId, account, activate } = useWeb3React();
  return (
    <Button
    color="inherit"
    variant="outlined" onClick={() => { activate(WalletConnect) }}>
        <img
    src="https://demo.storj-ipfs.com/ipfs/QmUm5zD77PiqVLAMTFtZFm4XpH32SJFPLS5c8b3QkCbUih"
    alt="Wallet Connect Logo"
    width="25px"
    height="25px"
    borderRadius="3px"
  />Wallet Connect</Button>

  
  );
}