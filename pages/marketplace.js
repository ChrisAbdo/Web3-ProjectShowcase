import React from "react";

const marketplace = () => {
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
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#6AB313] group-hover:-translate-x-0 group-hover:-translate-y-0 border-black border-[2px]"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#6AB313]"></span>
              <span className="relative text-black group-hover:text-black ">
                Open Menu
              </span>
            </label>

            <div className="card lg:card-side bg-base-100 shadow-xl">
              <figure>
                <img src="https://placeimg.com/400/400/arch" alt="Album" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">New album is released!</h2>
                <p>Click the button to listen on Spotiwhy app.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Listen</button>
                </div>
              </div>
            </div>
          </div>
          <div className="drawer-side border-black border-r-[2px] ">
            <label htmlFor="my-drawer-2" className="drawer-overlay "></label>

            <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
              <form className="flex items-center mb-4">
                <label htmlFor="simple-search" className="sr-only">
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                    placeholder="Search"
                    required=""
                  />
                </div>
                <button
                  type="submit"
                  className="p-2.5 ml-2 text-sm font-medium text-white bg-[#6AB313] rounded-lg border border-black hover:bg-[#6AB313] focus:outline-none focus:ring-2 focus:ring-offset-2 "
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
