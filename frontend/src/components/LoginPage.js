import React, { useState } from 'react';
import { ethers } from 'ethers';
import backgroundImage from '../assets/bg3.png';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// eslint-disable-next-line 
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpk8b_hlXZkUC0BwNgCMhInSGG5MFa65o",
  authDomain: "questlearn-565dc.firebaseapp.com",
  projectId: "questlearn-565dc",
  storageBucket: "questlearn-565dc.appspot.com",
  messagingSenderId: "1004107673187",
  appId: "1:1004107673187:web:2c57747ea7720cf877d256",
  measurementId: "G-9GNY8EDE0E"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginPage = ({ onLogin }) => {
  const [account, setAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const accountAddress = await signer.getAddress();
        setAccount(accountAddress);
        setErrorMessage('');
        onLogin();
      } else {
        setErrorMessage('MetaMask is not installed. Please install it to use this app.');
      }
    } catch (error) {
      setErrorMessage('Failed to connect to MetaMask. Please try again.');
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      setErrorMessage('');
      onLogin();
    } catch (error) {
      setErrorMessage('Failed to sign in with Google. Please try again.');
    }
  };

  return (
    <div 
      className="login-page" 
      style={{
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
       
      }}
    >
      <div style={{ 
        textAlign: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.1)', 
        padding: '20px', 
        borderRadius: '8px' ,
         marginLeft: '125vh',
         marginTop: '40vh'
      }}>
        <h2>Login</h2>
        {account ? (
          <p>Connected Account: {account}</p>
        ) : (
          <button onClick={connectWallet}>Connect Wallet & Login</button>
        )}
        <p>or</p>
        {user ? (
          <p>Welcome, {user.displayName}</p>
        ) : (
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        )}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
