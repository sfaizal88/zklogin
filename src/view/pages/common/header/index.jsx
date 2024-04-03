/**
 * 
 * Header component
 * @author - NA 
 * @date - 26th March, 2024
 * 
 */
// GENERIC IMPORT
import React from 'react';

// ICON IMPORT
import LogoIcon from '../../../../assets/img/logo-mainnet.svg';

// STYLE IMPORT
import useStyles from './styles';

const Header = () => {
    // DECLARE STYLE
    const classes = useStyles();

    return (
        <header className={classes.header}>
            <img src={LogoIcon}  alt="Logo" height={25}/>zkLogin
        </header>
    )
}

export default Header;