import { useState } from "react";






const Accept: React.FC = () => {

  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
        <div className="flex justify-center">
          <button
            className="relative z-0 rounded bg-pink-500 px-7 py-2 transition-[all_0.3s_ease] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-0 after:rounded after:bg-pink-700 after:transition-[all_0.3s_ease]  hover:after:w-full "
            onClick={() => setModalOpen(true)}
          >
            Get Start
          </button>
        </div>
        <div className=" flex flex-col">
          <>
            {isModalOpen ? (
              <div
                className="fixed z-50 inset-0 overflow-y-auto"
                aria-labelledby="modal-title"
                role="model"
                aria-modal="true"
              >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div
                    className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                  ></div>
                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <div className="inline-block align-bottom bg-white dark:bg-black/80 dark:text-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white dark:bg-black/80 dark:text-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <h3
                            className="text-lg leading-6 font-medium text-gray-900 "
                            id="modal-title"
                          >
                            Lorem ipsum
                          </h3>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500 dark:bg-black/80 dark:text-white">
                              OUR AGE RESTRICTIONS HAVE CHANGED. YOU MUST BE 18
                              OR OLDER TO USE OMEGLE. Persons under the age of
                              18 may not use Omegle. See our updated Terms of
                              Service for more info. By checking the box you
                              acknowledge and represent that you comply with
                              these age restrictions.
                            </p>
                            <p>
                              By checking the box you acknowledge that you have
                              reviewed and agree to be bound by Omegle’s Terms
                              of Service, Privacy Policy, and Community
                              Guidelines.
                            </p>
                          </div>

                          <div className="form-group form-check">
          
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-black/80 dark:text-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        onClick={() => setModalOpen(!true)}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        </div>

    </>
  );
};

export default Accept;
