import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
 const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
   const timer = setInterval(() => {
    setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
   }, 1000);

  return () => clearInterval(timer);

}, []);

  useEffect(() => {
   if (timeLeft <= 0) {
    window.location.href = "/login";
   }
  }, [timeLeft]);

  return (
    <div className="text-sm text-green mt-2">
     {timeLeft > 0 ? `You will be redirected to the login page in ${timeLeft} seconds.` : "Redirecting to login page..."}
    </div>
   );
};

export default CountdownTimer;
