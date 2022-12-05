import React, { useState } from 'react';
import Web3 from 'web3';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const LandingPage = () => {
  const [account, setAccount] = useState('');
  const [web3, setWeb3] = useState(null);

  const router = useRouter();

  const Web3Rerouter = async () => {
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
      router.push('/project-showcase');
    } catch (err) {
      console.log(err);
      toast.error('Account not connected. Please install MetaMask.', {
        id: notification,
      });
    }
  };
  return (
    <div className="">
      <div className="hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <lottie-player
            src="https://assets5.lottiefiles.com/packages/lf20_r8nsnfit.json"
            speed="1"
            style={{ width: '100%', height: 'auto' }}
            loop
            autoplay
          ></lottie-player>
          <div className="max-w-4xl px-12">
            <h1 className="text-7xl">
              Investing in Web3 projects has never been easier
            </h1>
            <p className="text py-6 max-w-lg text-xl">
              Find the best projects in the Web3 space and invest in them with a
              single click.
            </p>
            <a
              onClick={Web3Rerouter}
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
                Get Started
              </span>

              <span class="relative invisible">Button Text</span>
            </a>
          </div>
        </div>
      </div>

      <div className="hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img src="/gif.gif" className=" rounded-lg " />
          <div>
            <h1 className="text-7xl">
              Just a few clicks and you're ready to invest
            </h1>
            <p className="text py-6 text-2xl">
              Using ProjectXYZ is as easy as 1, 2, 3. Just follow the steps:
            </p>
            <ul className="text steps steps-vertical ">
              <li className="step step-primary">
                Connect your wallet and find a project you like in the showcase
              </li>
              <li className="step step-primary">
                Do some research by viewing the live demo and viewing more
                resources
              </li>
              <li className="step step-primary">
                Determine the amount you want to invest and click invest
              </li>
              <li className="step step-primary">
                Sit back and relax while your investment grows!
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
