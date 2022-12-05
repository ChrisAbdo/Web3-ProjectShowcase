import '../styles/globals.css';
import { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';

import Web3 from 'web3';
import toast, { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  const [account, setAccount] = useState('');
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const loadWeb3 = async () => {
      try {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (err) {
        console.log(err);
      }
    };
    loadWeb3();
  }, []);

  const Web3Handler = async () => {
    const notification = toast.loading('Connecting account...', {
      style: {
        border: '2px solid #000',
      },
    });
    try {
      const account = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const web3 = new Web3(window.ethereum);
      setAccount(account[0]);
      setWeb3(web3);
      toast.success('Account connected', {
        id: notification,
      });
    } catch (err) {
      console.log(err);
      toast.error('Account not connected. Please install MetaMask.', {
        id: notification,
      });
    }
  };
  return (
    <>
      <Navbar Web3Handler={Web3Handler} account={account} />
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}

export default MyApp;
