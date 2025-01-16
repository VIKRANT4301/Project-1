import { useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import "./ConnectWallet.css";

const ConnectWallet = () => {
  const { web3State, connectWallet } = useContext(Web3Context);

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error("Failed to connect wallet:", error.message);
    }
  };

  return (
    <div className="connect-wallet-container">
      <button onClick={handleConnect} className="connect-button">
        {web3State.selectedAccount ? "Wallet Connected" : "Connect Wallet"}
      </button>
      {web3State.selectedAccount && (
        <p className="wallet-info">Connected: {web3State.selectedAccount}</p>
      )}
    </div>
  );
};

export default ConnectWallet;
