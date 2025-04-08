import { motion, AnimatePresence } from "framer-motion";
import { Alert } from "react-daisyui";

const ErrorToast = ({ message, show, icon, iconBgColor, status, onClose }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.4 }}
          className="fixed top-5  transform -translate-x-1/2 z-50 w-[55%] "
        >
          <Alert
            className={`shadow-lg relative pr-2 rounded-[8px]  bg-[#e4b3b3eb]`}
          >
            {icon && (
             <div className="rounded-full bg-white">
                {icon}
              </div>
              
            )}

            <span className="font-medium text-[#222222ef] text-[19px]">
              {message}
            </span>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorToast;
