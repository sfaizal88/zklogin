/**
 * 
 * Login Page component
 * @author - NA 
 * @date - 26th March, 2024
 * 
 */
// GENERIC IMPORT
import React, {useState, useEffect} from 'react';
import {Box, Button} from '@mui/material';
import { googleLogout } from '@react-oauth/google';

// OTHER COMPONENT, HOOK, CONTEXT
import { Loader } from '../../atoms';
import  useRedirect from '../../../hooks/useRedirect';
import  * as PATH from '../../routes/constants';
import  useHomeHook from './useHomeHook';
import axios from 'axios';

// STYLE IMPORT
import useStyles from './styles';

function HomePage() {
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
    const [isLoading, setLoading] = useState(true);
    const [inputResult, setInputResult] = useState();
    const [ user, setUser ] = useState(getUserStorageData());
    const [ profile, setProfile ] = useState(getProfileStorageData());
    const {generateInput} = useHomeHook(setInputResult);
    

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile([]);
        setUser([]);
        localStorage.clear();
        gotoPage(PATH.LOGIN_PATH);
    };

    const createCAHolder = () => {

    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, [])

    return (
        <Box>
            {isLoading && <Loader/>}
            <Box className={classes.card}>
                <Box mb={1}><strong>User Logged in</strong></Box>
                <Box mb={1}><strong>Name:</strong> {profile.name}</Box>
                <Box mb={1}><strong>Email Address:</strong> {profile.email}</Box>
                <Box mb={1} className={classes.fieldRow}><strong>Access token:</strong> {user.access_token}</Box>
                <Box className={classes.btnContainer}>
                    <Button variant="outlined" onClick={logOut} color="error">Log out</Button>
                    <Button variant="contained" onClick={createCAHolder} >Create CA Holder</Button>
                    <Button variant="contained" onClick={generateInput} >Generate Input</Button>
                </Box>
            </Box>
        </Box>
    );
}

export default HomePage;
