import { motion, AnimatePresence } from 'framer-motion';
import { Alert } from 'react-daisyui';

const SuccessToast = ({ message, show, icon }) => {
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed top-5 inset-x-0 flex justify-center z-[9999]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
            className="w-[55%]"
          >
            <Alert className="alert alert-success bg-accent shadow-lg relative pr-2 rounded-lg">
              {icon && (
                <div>
                  {icon}
                </div>
              )}
              <span className="font-medium text-base">{message}</span>
            </Alert>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SuccessToast;
