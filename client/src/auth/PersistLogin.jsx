import React, { useEffect, useState } from 'react'
import { Outlet } from "react-router-dom"
import useAuth from './useAuth'
import useRefreshToken from './useRefreshToken';

const PersistLogin = () => {
    let isMounted = true;

    const { auth, persist } = useAuth();
    const refresh = useRefreshToken();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`accessToken: ${JSON.stringify(auth?.accessToken)}`);
    }, [isLoading])

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