import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import toast from 'react-hot-toast';
import axios from 'axios';

import Web3 from 'web3';
import Marketplace from '../backend/build/contracts/Marketplace.json';
import NFT from '../backend/build/contracts/NFT.json';
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectShowcase() {
  const router = useRouter();
  const { slug } = router.query;

  const [account, setAccount] = useState('');
  const [loading, setLoading] = useState(true);
  const [web3, setWeb3] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    name: '',
    description: '',
    livedemo: '',
    sourcecode: '',
  });

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
            livedemo: meta.data.livedemo,
            sourcecode: meta.data.sourcecode,
          };

          console.log(nft);
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
      {nfts.map((nft) => {
        if (nft.name === slug) {
          return (
            <div>
              {/* Section for 2 images to be on the same row. They should have a border and have a good gap between */}
              <div className="hero  bg-base-200 ">
                <div className="hero-content flex-col lg:flex-row-reverse">
                  <div className="card flex-shrink-0 w-full max-w-sm px-4 py-4 ">
                    <div className="card-body">
                      <h2 className="text-center">
                        More images coming soon!
                        <progress className="progress w-56"></progress>
                      </h2>
                    </div>
                  </div>
                  <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 border border-primary px-4 py-4">
                    <Image
                      src={nft.image}
                      width={700}
                      height={500}
                      className="bg-white"
                    />
                  </div>
                </div>
              </div>
              {/* Section for the description of the project */}
              <div className="hero bg-base-200 px-4">
                <div className="hero-content flex-col lg:flex-row-reverse ">
                  <div className="card bg-base-100 shadow-xl border border-primary">
                    <figure className="mt-6">
                      <Image
                        src={nft.image}
                        width={300}
                        height={300}
                        className="bg-white"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title truncate">{nft.name}</h2>
                      <h2 className="card-title text-sm truncate">
                        Uploaded by: {nft.seller.substring(0, 5)}...
                        {nft.seller.substring(38, 42)}
                      </h2>
                      <div className="card-actions justify-end">
                        <div className="badge badge-outline">SOFTWARE</div>
                        <div className="badge badge-outline">ETHEREUM</div>
                        <div className="badge badge-outline">POLYGON</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-5xl font-bold">{nft.name}</h1>

                    <h2 className="text-xl font-semibold mt-6">
                      Project Description
                    </h2>
                    <p className="max-w-3xl">{nft.description}</p>

                    <div className="flex space-x-4 mt-4">
                      <a
                        onClick={() => {
                          window.open(nft.livedemo, '_blank');
                        }}
                        className="relative inline-block px-4 py-2  group cursor-pointer"
                      >
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#abc4ff] group-hover:-translate-x-0 group-hover:-translate-y-0 border-black border-[2px]"></span>
                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#abc4ff]"></span>

                        <span className="relative text-black group-hover:text-black ">
                          Live Demo
                        </span>
                      </a>
                      <a
                        onClick={() => {
                          window.open(nft.sourcecode, '_blank');
                        }}
                        className="relative inline-block px-4 py-2  group cursor-pointer"
                      >
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#f6ac69] group-hover:-translate-x-0 group-hover:-translate-y-0 border-black border-[2px]"></span>
                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#f6ac69]"></span>

                        <span className="relative text-black group-hover:text-black ">
                          Source Code
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hero bg-base-200">
                <div className="hero-content text-center">
                  <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Want to invest?</h1>
                    <p className="py-6">
                      If you would like to become an investor in this project,
                      please contact: PLACEHOLDER
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
