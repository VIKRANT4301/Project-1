/* eslint-disable react/prop-types */
import  { useState } from "react";

import { Web3Context } from "./Web3Context";

const Web3Provider = ({ children }) => {
  const [web3State, setWeb3State] = useState({
    contractInstance: null,
    selectedAccount: null,
  });

  const connectWallet = async () => {
    if (!window.ethereum) {
        setWeb3State((prev) => ({ ...prev, error: "MetaMask not installed" }));
        return;
      }

      try {
        setWeb3State((prev) => ({ ...prev, loading: true, error: null }));
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await window.ethereum.request({
          method: "net_version",
        });

        setWeb3State((prev) => ({
          ...prev,
          selectedAccount: accounts[0],
          accounts,
          networkId,
          networkName: getNetworkName(networkId),
          loading: false,
        }));
      } catch (error) {
        setWeb3State((prev) => ({ ...prev, error: error.message, loading: false }));
      }
    };

    const getNetworkName = (networkId) => {
      switch (networkId) {
        case "1":
          return "Ethereum Mainnet";
        case "2":
          return "Ropsten Testnet";
        case "3":
          return "Rinkeby Testnet";
        case "4":
          return "Goerli Testnet";
        case "5":
          return "Kovan Testnet";
        default:
          return "Unknown Network";
      }

  };

  return (
    <Web3Context.Provider value={{ web3State, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
