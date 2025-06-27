import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import useAuth from '../../auth/useAuth';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const { auth } = useAuth();

  useEffect(() => {
    // Connect to backend server for socket
    const newSocket = io('http://localhost:5000', {
      withCredentials: true,
    });

    setSocket(newSocket);

    // Clean up
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (socket && auth?.id) {
      // Passes the logged in user's id to socket
      socket.emit('join', auth.id);
    }
  }, [socket, auth?.id]);


  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
