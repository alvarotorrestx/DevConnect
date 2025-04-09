import { useState } from 'react';

export const useErrorToast = () => {
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);

  const showError = (msg) => {
    setMessage(msg);
    setShow(true);
    setTimeout(() => setShow(false), 3000); 
  };

  return { message, show, showError };
};
