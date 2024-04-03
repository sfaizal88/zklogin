/**
 * 
 * Login Page component
 * @author - NA 
 * @date - 26th March, 2024
 * 
 */
// GENERIC IMPORT
import React from 'react';
import {Box} from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';

// OTHER COMPONENT, HOOK, CONTEXT

// STYLE IMPORT
import useStyles from './styles';

const LoginPage = () => {
    // DECLARE STYLE
    const classes = useStyles();

    const responseGoogle = (response) => {
        console.log(response); // You can see the response object in the console
        const jwtToken = response.tokenId; // Extract the JWT token from the response
        // You can now use the jwtToken as needed, such as sending it to your server
    };

    const responseMessage = (response) => {
        if (response?.credential) {
            const jwtToken = response?.credential;
            console.log("jwtToken: ", jwtToken);
            localStorage.setItem("jwtToken", jwtToken);
        }
        console.log("Output: ", response);
    };
    const errorMessage = (error) => {
        console.log("Output: ", error);
    };

    return (   
        <Box className={classes.container}>
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </Box>
    )
}

export default LoginPage;