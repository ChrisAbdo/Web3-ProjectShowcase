import React from 'react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    // <div className="px-6 py-6 bg-base-200">
    //   <div className="max-w-4xl">
    //     <h1 className="text-7xl">
    //       Investing in Web3 projects has never been easier
    //     </h1>
    //     <p className="text py-6 max-w-lg text-xl">
    //       Find the best projects in the Web3 space and invest in them with a
    //       single click.
    //     </p>
    //     <button className="text btn btn-primary">Get Started</button>
    //   </div>

    //   <lottie-player
    //     src="https://assets5.lottiefiles.com/packages/lf20_r8nsnfit.json"
    //     background="transparent"
    //     speed="1"
    //     style={{ width: '100%', height: 'auto' }}
    //     loop
    //     autoplay
    //   ></lottie-player>
    // </div>

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
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
