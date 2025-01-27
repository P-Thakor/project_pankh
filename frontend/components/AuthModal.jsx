import { motion, AnimatePresence } from "framer-motion";

const AuthModal = ({ isVisible, onClose, title, message, iconColor }) => {

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md relative text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex justify-center mb-4">
              <motion.div
                className={`w-16 h-16 ${iconColor} rounded-full flex items-center justify-center`}
                initial={{ scale: 0 }}
                animate={{ scale: 1.2 }}
                transition={{ duration: 0.5, repeat: 2, repeatType: "reverse" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  {title.includes("Unsuccessful") ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  )}
                </svg>
              </motion.div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <button
              onClick={onClose}
              className="bg-primaryblue text-white px-4 py-2 rounded-md hover:bg-primarydarkblue transition duration-300"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
