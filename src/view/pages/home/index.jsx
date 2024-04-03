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
import * as jose from 'jose'

// OTHER COMPONENT, HOOK, CONTEXT
import { Loader } from '../../atoms';
import  useRedirect from '../../../hooks/useRedirect';
import  * as PATH from '../../routes/constants';
// import {padString, toCircomBigIntBytes} from '../../../utils';

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

    const generateInput = async () => {
        const jwtSignature =
        "NHVaYe26MbtOYhSKkoKYdFVomg4i8ZJd8_-RU8VNbftc4TSMb4bXP3l3YlNWACwyXPGffz5aXHc6lty1Y2t4SWRqGteragsVdZufDn5BlnJl9pdR_kdVFUsra2rWKEofkZeIC4yWytE58sMIihvo9H1ScmmVwBcQP6XETqYd0aSHp1gOa9RdUPDvoXQ5oqygTqVtxaDr6wUFKrKItgBMzWIdNZ6y7O9E0DhEPTbE9rfBo6KTFsHAZnMg4k68CDp2woYIaXbmYTWcvbzIuHO7_37GT79XdIwkm95QJ7hYC9RiwrV7mesbY4PAahERJawntho0my942XheVLmGwLMBkQ";
        const salt = "a677999396dc49a28ad6c9c242719bb3";

        const JWKS = jose.createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'));
        const jwt = localStorage.getItem("access_token");

        const { payload, protectedHeader } = await jose.jwtVerify(jwt, JWKS);
        console.log("payload: ", payload);
        console.log("protectedHeader: ", protectedHeader);
        /* const signatureBigInt = BigInt(
            "0x" + Buffer.from(jwtSignature, "base64").toString("hex")
        );
        const pubKeyData = pki.publicKeyFromPem(publicKeyPem.toString());
        const pubkeyBigInt = BigInt(pubKeyData.n.toString());

        const input = {
            jwt: padString(jwt, 512),
            signature: toCircomBigIntBytes(signatureBigInt),
            pubkey: toCircomBigIntBytes(pubkeyBigInt),
            salt: padString(salt, 32),
        };
        setInputResult(input); */
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
