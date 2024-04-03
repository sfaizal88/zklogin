/**
 * 
 * Entry Routes
 * @author - NA 
 * @date - 13th March, 2024
 * 
 */
// GENERIC IMPORT
import React, { Route, Routes, HashRouter } from 'react-router-dom';

// PAGE 
import LoginPage from '../pages/login';
import HomePage from '../pages/home';

// ROUTER IMPORT
import * as PATH from './constants';

// ENTRY ROUTER VARIABLE DECLARE
const EntryRoutes = () => (
  <HashRouter>
    <Routes>
      <Route path={PATH.LOGIN_PATH} element={<LoginPage />}/>
      <Route path={PATH.HOME_PATH} element={<HomePage />}/>
    </Routes>
  </HashRouter>
);

// EXPORT COMPONENT
export default EntryRoutes;
