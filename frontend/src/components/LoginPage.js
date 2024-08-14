import React, { useState } from 'react';
import { BrowserProvider } from 'ethers'; // Use the BrowserProvider from ethers

const LoginPage = ({ onLogin }) => {
  const [account, setAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum); // Use BrowserProvider
        await provider.send("eth_requestAccounts", []); // Request wallet connection
        const signer = await provider.getSigner(); // Get signer
        const account = await signer.getAddress();
        setAccount(account);
        setErrorMessage('');
        onLogin();
      } else {
        setErrorMessage('MetaMask is not installed. Please install it to use this app.');
      }
    } catch (error) {
      setErrorMessage('Failed to connect to MetaMask. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {account ? (
        <p>Connected Account: {account}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet & Login</button>
      )}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default LoginPage;
