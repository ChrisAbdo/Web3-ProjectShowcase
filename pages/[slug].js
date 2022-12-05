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
      {/* find the nft tokenID respective to the slug and display the information */}
      {nfts.map((nft) => {
        if (nft.tokenId === slug) {
          return (
            <div>
              <h1>
                {nft.name} - {nft.tokenId}
              </h1>
              <Image src={nft.image} width={500} height={500} />
              <p>{nft.description}</p>
            </div>
          );
        }
      })}
    </div>
  );
}
