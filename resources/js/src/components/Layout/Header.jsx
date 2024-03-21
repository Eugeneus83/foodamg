import React from 'react';
import {NavLink} from 'react-router-dom';
import sushiImage from '../../assets/sushi.jpg';
import styles from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {

    return <React.Fragment>
        <header className={styles.header}>
            <h1>The best online store!</h1>
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <NavLink activeClassName={styles.active} to='/orders'>My orders</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={styles.active} to='/'>Home</NavLink>
                    </li>
                </ul>
            </nav>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
    </React.Fragment>
};

export default Header;
