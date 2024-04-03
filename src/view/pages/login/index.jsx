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
import { Loader } from '../../atoms';
import  useRedirect from '../../../hooks/useRedirect';
import  * as PATH from '../../routes/constants';
import  GoogleImage from '../../../assets/img/google-button.png';

import axios from 'axios';

// STYLE IMPORT
import useStyles from './styles';

function LoginPage() {
    // DECLARE STYLE
    const classes = useStyles();
    const {gotoPage} = useRedirect();

    const getUserStorageData = () => {
        const useData = localStorage.getItem("useData");
        return useData ? JSON.parse(useData) : {}
    }
    const getProfileStorageData = () => {
        const profileData = localStorage.getItem("profileData");
        return profileData ? JSON.parse(profileData) : {}
    }
    const [isLoading, setLoading] = useState(false);
    const [ user, setUser ] = useState(getUserStorageData());
    const [ profile, setProfile ] = useState(getProfileStorageData());

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            if (codeResponse){ 
                localStorage.setItem("access_token", codeResponse?.access_token);
                localStorage.setItem("useData", JSON.stringify(codeResponse));
                setUser(codeResponse)
            }
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                setLoading(true);
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
                        setLoading(false);
                        gotoPage(PATH.HOME_PATH);
                    })
                    .catch((err) => {
                        console.log(err);
                        setLoading(false);
                    });
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile([]);
        setUser([]);
        localStorage.clear();
    };

    return (
        <Box>
            {isLoading && <Loader/>}
            {(Array.isArray(profile) && profile.length !== 0) || (typeof profile === 'object' && Object.keys(profile).length !== 0) ? (
                <Box>
                    <Box mb={1}><strong>User Logged in</strong></Box>
                    <Box mb={1}><strong>Name:</strong> {profile.name}</Box>
                    <Box mb={1}><strong>Email Address:</strong> {profile.email}</Box>
                    <Box mb={1} className={classes.fieldRow}><strong>Access token:</strong> {user.access_token}</Box>
                    <button onClick={logOut}>Log out</button>
                </Box>
            ) : (
                <Box className={classes.btnContainer}><img src={GoogleImage} onClick={login} height={50}/></Box>
            )}
        </Box>
    );
}

export default LoginPage;
