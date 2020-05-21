import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import classes from './Toolbar.css';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.open}/>
        <Logo height="80%"/>
        <nav className={classes.DesktopOnly}>
          <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
    </header>
)

export default toolbar;