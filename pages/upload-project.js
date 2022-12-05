import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import toast from 'react-hot-toast';

import Web3 from 'web3';
import Marketplace from '../backend/build/contracts/Marketplace.json';
import NFT from '../backend/build/contracts/NFT.json';

const createItem = () => {
  const [account, setAccount] = useState('');
  const [loading, setLoading] = useState(true);
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    name: '',
    description: '',
    livedemo: '',
    sourcecode: '',
  });

  const router = useRouter();

  useEffect(() => {
    loadBlockchainData();
    if (!account) {
      toast.error('Please connect your wallet to continue', {
        style: {
          border: '2px solid #000',
          // make bold
          fontWeight: 'bold',
        },
      });
      return;
    }
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

  async function onChange(e) {
    // upload image to IPFS
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.io/ipfs/${added.path}`;
      console.log(url);
      setFileUrl(url);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  async function uploadToIPFS() {
    const { name, description, livedemo, sourcecode } = formInput;
    if (!name || !description || !livedemo || !sourcecode || !fileUrl) {
      return;
    } else {
      // first, upload metadata to IPFS
      const data = JSON.stringify({
        name,
        description,
        livedemo,
        sourcecode,
        image: fileUrl,
      });
      try {
        const added = await client.add(data);
        const url = `https://ipfs.io/ipfs/${added.path}`;
        // after metadata is uploaded to IPFS, return the URL to use it in the transaction
        return url;
      } catch (error) {
        console.log('Error uploading file: ', error);
      }
    }
  }

  async function listNFTForSale() {
    if (formInput.description.length < 100) {
      toast.error('Description must be at least 100 characters long', {
        style: {
          border: '2px solid #000',
          // make bold
          fontWeight: 'bold',
        },
      });
      return;
    }
    const notification = toast.loading(
      'Make sure to confirm both transactions!',
      {
        style: {
          border: '2px solid #000',
          className: 'text',
        },
      }
    );

    try {
      const web3 = new Web3(window.ethereum);
      const provider = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const url = await uploadToIPFS();
      const networkId = await web3.eth.net.getId();

      // Mint the NFT
      const NFTContractAddress = NFT.networks[networkId].address;
      const NFTContract = new web3.eth.Contract(NFT.abi, NFTContractAddress);
      const accounts = await web3.eth.getAccounts();
      const marketPlaceContract = new web3.eth.Contract(
        Marketplace.abi,
        Marketplace.networks[networkId].address
      );

      setLoading(true);
      NFTContract.methods
        .mint(url)
        .send({ from: accounts[0] })
        .on('receipt', function (receipt) {
          console.log('minted');
          // List the NFT
          const tokenId = receipt.events.NFTMinted.returnValues[0];
          marketPlaceContract.methods
            .listNft(NFTContractAddress, tokenId)
            .send({ from: accounts[0] })
            .on('receipt', function () {
              console.log('listed');

              toast.success('NFT listed', {
                id: notification,
                style: {
                  border: '2px solid #000',
                },
              });

              setLoading(false);
              // wait 2 seconds, then reload the page
              setTimeout(() => {
                router.push('/project-showcase');
              }, 1000);
            });
        });
    } catch (error) {
      console.log(error);
      toast.error('Error creating stem', { id: notification });
    }
  }

  return (
    <div className="text">
      <div className="flex justify-center items-center mb-4 mt-4">
        <div className="text-4xl font-bold text-center">Upload Project</div>
      </div>
      {/* two columns that split the page in a 30% 70% manner, 1 column per row in mobile view */}

      <div className="px-12">
        <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100 border-primary border-[2px]">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  File | Acceptable Types: JPG, PNG, WEBP
                </span>
              </label>

              <input
                className="file-input border border-primary"
                id="file_input"
                type="file"
                onChange={onChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Project Title"
                className="input border-primary"
                onChange={(e) =>
                  updateFormInput({ ...formInput, name: e.target.value })
                }
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Description | 100 Character Minimum
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                placeholder="Project Description"
                className="input border-primary"
                onChange={(e) =>
                  updateFormInput({
                    ...formInput,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Live Demo URL | https:// format
                </span>
              </label>
              <input
                type="text"
                placeholder="https://"
                className="input border-primary"
                onChange={(e) =>
                  updateFormInput({
                    ...formInput,
                    livedemo: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Source Code URL | https:// format
                </span>
              </label>
              <input
                type="text"
                placeholder="https://"
                className="input border-primary"
                onChange={(e) =>
                  updateFormInput({
                    ...formInput,
                    sourcecode: e.target.value,
                  })
                }
              />
            </div>

            {/* <div className="form-control mt-6">
              {account ? (
                <div
                  onClick={listNFTForSale}
                  className="relative inline-block px-4 py-2  group cursor-pointer"
                >
                  <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#6AB313] group-hover:-translate-x-0 group-hover:-translate-y-0 border-black border-[2px]"></span>
                  <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#6AB313]"></span>
                  <span className="relative text-black group-hover:text-black text-center flex flex-col">
                    Upload Project
                  </span>
                </div>
              ) : (
                <div></div>
              )}
            </div> */}
            <div className="form-control mt-6">
              <a
                onClick={listNFTForSale}
                class="text cursor-pointer relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium  transition duration-300 ease-out border-2 border-primary rounded-full shadow-md group"
              >
                <span class="absolute inset-0 flex items-center justify-center w-full h-full  duration-300 -translate-x-full  group-hover:translate-x-0 ease">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </span>

                <span class="absolute flex items-center justify-center w-full h-full  transition-all duration-300 transform group-hover:translate-x-full ease">
                  Upload Project
                </span>

                <span class="relative invisible">Button Text</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
    </div>
  );
};

export default createItem;
