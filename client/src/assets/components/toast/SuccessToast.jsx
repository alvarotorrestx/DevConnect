import { motion, AnimatePresence } from 'framer-motion';
import { Alert } from 'react-daisyui';

const SuccessToast = ({ message, show, icon }) => {
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
          <Alert className="shadow-lg relative pr-2 rounded-[8px] border-[1.5px] bg-[#b1efc5]">
            {icon && (
              <div className="rounded-full bg-white">
                {icon}
              </div>
            )}
            <span className="font-medium text-[#1e4620] text-[19px]">{message}</span>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessToast;
