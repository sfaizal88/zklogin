/**
 * 
 * Login Page component
 * @author - NA 
 * @date - 26th March, 2024
 * 
 */
// GENERIC IMPORT
import React, {useState, useEffect} from 'react';
import {Box} from '@mui/material';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

// OTHER COMPONENT, HOOK, CONTEXT

import axios from 'axios';

function LoginPage() {

    const getUserStorageData = () => {
        const useData = localStorage.getItem("useData");
        return JSON.parse(useData) || [];
    }
    const getProfileStorageData = () => {
        const profileData = localStorage.getItem("profileData");
        return JSON.parse(profileData) || [];
    }
    const [ user, setUser ] = useState(getUserStorageData());
    const [ profile, setProfile ] = useState(getProfileStorageData());

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            localStorage.setItem("access_token", codeResponse.access_token);
            localStorage.setItem("useData", JSON.stringify(codeResponse));
            setUser(codeResponse)
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                        localStorage.setItem("profileData", JSON.stringify(res.data));
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
        localStorage.clear();
    };

    return (
        <Box>
            {profile ? (
                <Box>
                    <Box mb={1}><strong>User Logged in</strong></Box>
                    <Box mb={1}><strong>Name:</strong> {profile.name}</Box>
                    <Box mb={1}><strong>Email Address:</strong> {profile.email}</Box>
                    <Box mb={1}><strong>Access token:</strong> {user.access_token}</Box>
                    <button onClick={logOut}>Log out</button>
                </Box>
            ) : (
                <button onClick={login}>Sign in with Google</button>
            )}
        </Box>
    );
}

export default LoginPage;
