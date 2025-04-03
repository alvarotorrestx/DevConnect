import { useContext } from 'react';
import AuthContext from '../assets/context/AuthContext';

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;