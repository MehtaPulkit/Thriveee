import { XMarkIcon } from "@heroicons/react/24/outline";

const PopUpModal = ({ title, content, openModal, setOpenModal, reset }) => {
  return (
    <>
      {openModal && (
        <div
          id="modal"
          className="fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0  max-h-full bg-gray-900/50 dark:bg-gray-900/80 h-full"
        >
          <div className="relative w-full max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* <!-- Modal header --> */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  {title}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="medium-modal"
                  onClick={() => {
                    setOpenModal(false);
                    reset({ contactId: "" });
                  }}
                >
                  <XMarkIcon className="text-gray-800 w-6 dark:text-white" />
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="p-4 md:p-5 space-y-4">{content}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpModal;
