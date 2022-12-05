import React from 'react';
import { Animate, Transition } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="px-6 py-6 bg-base-200">
      <div className="max-w-4xl">
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
  );
};

export default LandingPage;
