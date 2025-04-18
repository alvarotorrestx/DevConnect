import { useState } from 'react';

export const useSuccessToast = () => {
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);

  const showSuccess = (msg) => {
    setMessage(msg);
    setShow(true);
    setTimeout(() => setShow(false), 3000);
  };

  return { message, show, showSuccess };
};