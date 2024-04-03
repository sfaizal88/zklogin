/**
 * 
 * Common useNavigate component
 * @author - NA 
 * @date - 13th March, 2024
 * 
 */
// GENERIC IMPORT
import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function useRedirect() {
    // NAVBAR
    const navigate = useNavigate();

    const gotoPage = (link) => {
        navigate(link);
    };

    return {gotoPage}
}