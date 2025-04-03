import React, { useEffect, useState } from 'react'
import { Outlet } from "react-router-dom"
import useAuth from './useAuth'
import useRefreshToken from './useRefreshToken';

const PersistLogin = () => {
    const { auth, persist } = useAuth();
    const refresh = useRefreshToken();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.log(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

    return (
        <>
            {!persist
                ?
                <Outlet />
                :
                isLoading
                    ?
                    <p>Loading...</p>
                    :
                    <Outlet />
            }
        </>
    )
}

export default PersistLogin