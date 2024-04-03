/**
 * 
 * Loader component
 * @author - NA 
 * @date - 1st March, 2024
 * 
 */
// GENERIC IMPORT
import React from 'react';
import {Backdrop, CircularProgress} from '@mui/material';

const Loader = () => {
    return (
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 999 }}
        open
    >
        <CircularProgress color="inherit" />
  </Backdrop>)
};

export default Loader;