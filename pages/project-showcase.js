import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import toast from 'react-hot-toast';
import axios from 'axios';

import Web3 from 'web3';
import Marketplace from '../backend/build/contracts/Marketplace.json';
import NFT from '../backend/build/contracts/NFT.json';
import Image from 'next/image';
import Link from 'next/link';

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
        <div className="flex justify-center items-center mt-4 mb-2">
          <div className="text-4xl  text-center">Project Showcase</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-20">
          {nfts.map((nft, i) => (
            <div
              key={i}
              className="border-[2px] border-primary  shadow overflow-hidden hover:scale-[1.03] transform transition duration-500 ease-in-out mb-4"
            >
              <Image
                src={nft.image}
                width={300}
                height={300}
                className="bg-white"
              />

              <div className="p-4 space-y-2">
                <p className="text-2xl truncate">{nft.name}</p>

                <p className="">
                  {nft.description.length > 105
                    ? nft.description.substring(0, 105) + '...'
                    : nft.description}
                </p>
                <p>
                  <span className="font-semibold">Uploaded by: </span>
                  {nft.seller.slice(0, 5)}...
                  {nft.seller.slice(-4)}
                </p>
                <p className="space-x-2">
                  {/* <Link href="/[slug]" as={`/${nft.tokenId}`}>
                        <a className="text-blue-500">View</a>
                      </Link> */}
                  <Link href="/[slug]" as={`/${nft.name}`}>
                    <a
                      href="#_"
                      className="relative inline-block px-4 py-2  group w-full text-center"
                    >
                      <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#CAFFBF] group-hover:-translate-x-0 group-hover:-translate-y-0 border-black border-[2px]"></span>
                      <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#CAFFBF]"></span>

                      <span className="relative text-black group-hover:text-black ">
                        View Project
                      </span>
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default marketplace;
