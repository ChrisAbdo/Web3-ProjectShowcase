import React from "react";

const createItem = () => {
  return (
    <div>
      <div className="flex justify-center items-center mb-4 mt-4">
        <div className="text-4xl font-bold text-center">
          Publish Your First Stem
        </div>
      </div>
      {/* two columns that split the page in a 30% 70% manner, 1 column per row in mobile view */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-black min-h-screen">
        {/* left column */}
        <div className=" bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <p className="py-6">
                Click some buttons, fill in some boxes, and go live in seconds.
                <br />
              </p>
              <p className="py-6">
                View the <a href="#">FAQ</a> for more information.
              </p>
            </div>
          </div>
        </div>

        {/* right column */}
        <div className="col-span-2 py-3 px-3">
          <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100 border-black border-[2px]">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">File</span>
                </label>

                <input
                  class="block w-full text-sm text-black bg-gray-50  border border-black cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-100 dark:border-gray-100 dark:placeholder-gray-400"
                  id="file_input"
                  type="file"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Stem Title"
                  className="input border-black"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <input
                  type="text"
                  placeholder="Stem Description"
                  className="input border-black"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Supply</span>
                </label>
                <input
                  type="number"
                  placeholder="Stem Supply"
                  className="input border-black"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Royalty Split %</span>
                </label>
                <input
                  type="number"
                  placeholder="Stem Royalty Split %"
                  className="input border-black"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>

                <label className="input-group">
                  <input
                    type="text"
                    placeholder="0.01"
                    className="input border-black w-full"
                  />
                  <span className="border-black border-t border-r border-b">
                    MATIC
                  </span>
                </label>
              </div>
              <div className="form-control mt-6">
                <a href="#_" className="relative inline-block px-4 py-2  group">
                  <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#6AB313] group-hover:-translate-x-0 group-hover:-translate-y-0 border-black border-[2px]"></span>
                  <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#6AB313]"></span>
                  <span className="relative text-black group-hover:text-black text-center flex flex-col">
                    Create Stem
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="divider">or</div>
          <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100 border-black border-[2px]">
            <div className="card-body">
              {/* centered big text that says Not Ready to Sell? */}
              <div className="text-center text-2xl ">Not Ready to Sell?</div>
              <div className="text-center text-2xl ">
                <p className="py-6">
                  <a href="#">Update your profile</a> to get started.
                </p>
              </div>

              <div className="form-control mt-6">
                <a href="#_" className="relative inline-block px-4 py-2  group">
                  <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#ff90e8] group-hover:-translate-x-0 group-hover:-translate-y-0 border-black border-t border-r border-b"></span>
                  <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#ff90e8]"></span>
                  <span className="relative text-black group-hover:text-black text-center flex flex-col">
                    Update Profile
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
    </div>
  );
};

export default createItem;
