import {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import CartIcon from '../../components/Cart/CartIcon';
import styles from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {

    const cart = useSelector((state) => state.cart);

    const cartItemsNumber = cart.items.reduce((currentValue, item) => {
        return currentValue + item.amount;
    }, 0);

    const [isButtonAnimated, setIsButtonAnimated] = useState(false);

    const btnClass = `${styles.button} ${isButtonAnimated ? styles.bump : ''}`;

    useEffect(() => {

        if (cart.items.length === 0) {
            return;
        }

        setIsButtonAnimated(true);

        const timeout = setTimeout(() => {
            setIsButtonAnimated(false);
        }, 300);

        return () => {
            clearTimeout(timeout);
        }
    }, [cart.items]);

    return <button className={btnClass} onClick={props.onClick}>
    <span className={styles.icon}>
        <CartIcon/>
    </span>
        <span>Cart</span>
        <span className={styles.badge}>{cartItemsNumber}</span>
    </button>
};

export default HeaderCartButton;
