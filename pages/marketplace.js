import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import toast from 'react-hot-toast';
import axios from 'axios';

import Web3 from 'web3';
import Marketplace from '../backend/build/contracts/Marketplace.json';
import NFT from '../backend/build/contracts/NFT.json';

const marketplace = () => {
  const [account, setAccount] = useState('');
  const [loading, setLoading] = useState(true);
  const [web3, setWeb3] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    name: '',
    description: '',
  });
  const router = useRouter();

  useEffect(() => {
    loadBlockchainData();
    loadNFTs();
  }, [account]);

  const ipfsClient = require('ipfs-http-client');
  const projectId = '2FdliMGfWHQCzVYTtFlGQsknZvb';
  const projectSecret = '2274a79139ff6fdb2f016d12f713dca1';
  const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
  const client = ipfsClient.create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  });

  const Web3Handler = async () => {
    const notification = toast.loading('Connecting account...');
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
      // wait 2 seconds and reload the page
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
      toast.error('Account not connected', {
        id: notification,
      });
    }
  };

  const loadBlockchainData = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  async function loadNFTs() {
    const web3 = new Web3(window.ethereum);

    const networkId = await web3.eth.net.getId();

    // Get all listed NFTs
    const marketPlaceContract = new web3.eth.Contract(
      Marketplace.abi,
      Marketplace.networks[networkId].address
    );
    const listings = await marketPlaceContract.methods.getListedNfts().call();
    // Iterate over the listed NFTs and retrieve their metadata
    const nfts = await Promise.all(
      listings.map(async (i) => {
        try {
          const NFTContract = new web3.eth.Contract(
            NFT.abi,
            NFT.networks[networkId].address
          );
          const tokenURI = await NFTContract.methods.tokenURI(i.tokenId).call();
          const meta = await axios.get(tokenURI);
          const nft = {
            tokenId: i.tokenId,
            seller: i.seller,
            owner: i.buyer,
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
          };
          return nft;
        } catch (err) {
          console.log(err);
          return null;
        }
      })
    );
    setNfts(nfts.filter((nft) => nft !== null));
    setLoadingState('loaded');
  }

  return (
    <div>
      <div>
        <div className="drawer drawer-mobile fixed">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center mt-2 ">
            {/* <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden w-full"
            >
              Open drawer
            </label> */}
            <label
              htmlFor="my-drawer-2"
              className="relative inline-block px-4 py-2 group w-5/6 lg:hidden"
            >
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#ff90e8] group-hover:-translate-x-0 group-hover:-translate-y-0 border-black border-[2px]"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#ff90e8]"></span>
              <span className="relative text-black group-hover:text-black ">
                Open Menu
              </span>
            </label>

            <div className="flex justify-center items-center mt-4 mb-2">
              <div className="text-4xl font-bold text-center">
                Stem Marketplace
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 pt-4  w-full  py-6 px-6">
              {nfts.map((nft, i) => (
                <div
                  key={i}
                  className="border-[2px] border-black shadow overflow-hidden hover:scale-[1.03] transform transition duration-500 ease-in-out mb-4"
                >
                  <figure className="flex items-center justify-center  w-full">
                    <audio
                      controls
                      controlsList="nodownload"
                      className="w-full border-b-[2px] border-black"
                    >
                      <source src={nft.image} type="audio/mpeg" />
                    </audio>
                  </figure>

                  <div className="p-4 space-y-2">
                    <p className="text-2xl font-semibold">{nft.name}</p>

                    <p className="">
                      <span className="font-semibold">Description: </span>
                      {nft.description}
                    </p>
                    <p>
                      {/* Uploaded by: {nft.seller.slice(0, 5)}...
                      {nft.seller.slice(-4)} */}
                      <span className="font-semibold">Uploaded by: </span>
                      {nft.seller.slice(0, 5)}...
                      {nft.seller.slice(-4)}
                    </p>
                    <p className="space-x-2">
                      <span className="badge">genre</span>
                      <span className="badge">instrument</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="drawer-side border-black border-r-[2px] ">
            <label htmlFor="my-drawer-2" className="drawer-overlay "></label>

            <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
              <form className="flex items-center mb-4">
                <label
                  htmlFor="simple-search"
                  className="sr-only border-black border"
                >
                  Search
                </label>
                <div className="relative w-full">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-black text-black text-sm rounded-lg block w-full pl-10 p-2.5 "
                    placeholder="Search"
                    required=""
                  />
                </div>
                <button
                  type="submit"
                  className="p-2.5 ml-2 text-sm font-medium text-black bg-[#6AB313] rounded-lg border border-black hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </form>

              <li className="menu-title">Sort by Genre</li>
              <li>
                <a href="#">Hip Hop</a>
              </li>
              <li>
                <a href="#">Trap</a>
              </li>
              <li>
                <a href="#">R&B</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default marketplace;
