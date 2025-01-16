import  { useState } from "react";
import ConnectWallet from "../utils/ConnectWallet"
import "./Wallet.css";

const Wallet = () => {
  const [walletInfo, setWalletInfo] = useState([]);
  const [error, setError] = useState("");

  const handleConnectWallet = async () => {
    try {
      const accountsData = await ConnectWallet();
      setWalletInfo(accountsData);
      setError(""); // Clear any existing error
    } catch (err) {
      handleError(err);
    }
  };

  const handleError = (err) => {
    if (err.message.includes("Metamask")) {
      setError("MetaMask is not installed. Please install MetaMask to continue.");
    } else if (err.message.includes("User rejected")) {
      setError("Wallet connection was rejected. Please try again and accept the connection request.");
    } else {
      setError(`An unknown error occurred: ${err.message}`);
    }
  };

  return (
    <div className="wallet-container">
      <button onClick={handleConnectWallet}>Connect Wallet</button>
      {error && (
        <div className="error-box">
          <p>{error}</p>
          <button onClick={handleConnectWallet} className="retry-button">Retry</button>
        </div>
      )}
      <div>
        {walletInfo.map(({ account, contractInstances }, index) => (
          <div key={index} className="wallet-info">
            <h3>Account: {account}</h3>
            <ul>
              {contractInstances.map(({ address }, contractIndex) => (
                <li key={contractIndex}>Contract Address: {address}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wallet;
