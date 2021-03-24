import React from 'react'
import NavigationItems from '../NavigationItems/NavigationItems'
import Logo from '../../Logo/Logo'
import styles from './SideDrawer.module.css'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {

    const classes = [styles.SideDrawer];

    if(!props.open) {
        classes.push(styles.Close);
    }

    const appliedClasses = classes.join(' ');

    return (
        <Auxiliary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={appliedClasses} onClick={props.closed}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuthenticated} />
                </nav>
            </div>
        </Auxiliary>
    );
}

export default sideDrawer;